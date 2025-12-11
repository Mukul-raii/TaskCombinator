import app from "./app.js";
import dotenv from "dotenv";
import ConnectDb from "./db/db.js";
import { startKeepAlive } from "./utils/keepAlive.js";

dotenv.config({ path: "./.env" });

const RunningPORT = process.env.PORT;

ConnectDb()
  .then(() => {
    app.listen(RunningPORT, () => {
      console.log(`Server is running on port ${RunningPORT}`);

      // Start keep-alive cron job
      startKeepAlive();
    });
  })
  .catch((error) => {
    console.log(error);
  });
