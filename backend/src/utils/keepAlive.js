import axios from "axios";

/**
 * Keep-alive utility to prevent server from sleeping on free hosting platforms
 * Pings the server at regular intervals
 */

const BACKEND_URL =
  process.env.BACKEND_URL || "https://taskcombinatorserver.onrender.com";
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (free tier servers usually sleep after 15 mins of inactivity)
const INITIAL_DELAY = 2 * 60 * 1000; // 2 minutes delay before first ping

/**
 * Ping the server to keep it alive
 */
const pingServer = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/health`, {
      timeout: 10000, // 10 second timeout
    });
    console.log(
      `✅ Keep-alive ping successful at ${new Date().toISOString()}:`,
      response.data
    );
  } catch (error) {
    // Only log if it's not the initial ping attempt
    if (error.response) {
      console.error(
        `❌ Keep-alive ping failed at ${new Date().toISOString()}: Status ${
          error.response.status
        }`
      );
    } else if (error.code === "ECONNREFUSED") {
      console.error(
        `⚠️  Keep-alive ping: Connection refused (server may still be starting)`
      );
    } else {
      console.error(
        `❌ Keep-alive ping failed at ${new Date().toISOString()}:`,
        error.message
      );
    }
  }
};

/**
 * Start the keep-alive cron job
 */
export const startKeepAlive = () => {
  // Only run keep-alive in production
  if (process.env.NODE_ENV === "production") {
    console.log(
      `🚀 Keep-alive cron job started. Will ping every ${
        PING_INTERVAL / 60000
      } minutes.`
    );
    console.log(
      `⏰ First ping scheduled in ${INITIAL_DELAY / 60000} minutes...`
    );

    // Wait before first ping to ensure server is fully deployed and accessible
    setTimeout(() => {
      console.log("🔔 Initiating first keep-alive ping...");
      pingServer();

      // Set up interval for subsequent pings
      setInterval(pingServer, PING_INTERVAL);
    }, INITIAL_DELAY);
  } else {
    console.log("⏭️  Keep-alive cron job skipped (not in production mode)");
  }
};

/**
 * Self-ping function for external cron services (like cron-job.org or EasyCron)
 * This is an alternative approach where external services ping your endpoint
 */
export const handleExternalPing = (_req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`🔔 External keep-alive ping received at ${timestamp}`);
  res.status(200).json({
    status: "alive",
    message: "Server is running",
    timestamp,
    uptime: process.uptime(),
  });
};
