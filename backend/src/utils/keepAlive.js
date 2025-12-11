import axios from "axios";

/**
 * Keep-alive utility to prevent server from sleeping on free hosting platforms
 * Pings the server at regular intervals
 */

const BACKEND_URL =
  process.env.BACKEND_URL || "https://taskcombinatorserver.onrender.com";
const PING_INTERVAL = 7 * 60 * 1000; // 14 minutes (free tier servers usually sleep after 15 mins of inactivity)

/**
 * Ping the server to keep it alive
 */
const pingServer = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/health`);
    console.log(
      `✅ Keep-alive ping successful at ${new Date().toISOString()}:`,
      response.data
    );
  } catch (error) {
    console.error(
      `❌ Keep-alive ping failed at ${new Date().toISOString()}:`,
      error.message
    );
  }
};

/**
 * Start the keep-alive cron job
 */
export const startKeepAlive = () => {
  // Only run keep-alive in production
  if (process.env.NODE_ENV === "production") {
    console.log(
      `🚀 Keep-alive cron job started. Pinging every ${
        PING_INTERVAL / 60000
      } minutes.`
    );

    // Initial ping
    pingServer();

    // Set up interval
    setInterval(pingServer, PING_INTERVAL);
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
