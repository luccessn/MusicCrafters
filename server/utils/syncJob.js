const cron = require("node-cron");
const axios = require("axios");

const startSyncJob = () => {
  //ყოველ 5 წუთში არესტარტებს
  cron.schedule("*/5 * * * *", async () => {
    console.log("🔁 Printful სინქრონიზაცია დაიწყო...");
    try {
      const response = await axios.get("http://localhost:3000/api/design/sync");
      console.log("✅ სინქრონიზაცია წარმატებულია:", response.data.message);
    } catch (error) {
      console.error("❌ სინქრონიზაციის შეცდომა:", error.message);
    }
  });
};
module.exports = startSyncJob;
