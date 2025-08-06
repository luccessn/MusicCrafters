require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cron = require("node-cron");
const axios = require("axios");

const app = express();

// Middleware-ები
app.use(cors());
app.use(express.json());

// MongoDB კავშირი
// useNewUrlParser: true,
// useUnifiedTopology: true,
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => {
    console.log("ავშირი MongoDB-თან წარმატებით დამყარდა");
  })
  .catch((err) => console.error("MongoDB კავშირის შეცდომა:", err));

// Root
app.get("/server", (req, res) => {
  res.send("BackEND ი წარმატებით მუშაობს");
});

// PayPal
const paypalRoutes = require("./routes/paymentRoutes");
app.use("/server/api/paypal", paypalRoutes);

//
const printfulRoutes = require("./routes/printfulRoutes");
app.use("/server/api/printful", printfulRoutes);
//
//ყოველ 5 წუთში არესტარტებს
cron.schedule("*/5 * * * *", async () => {
  console.log("Printful სინქრონიზაცია დაიწყო...");
  try {
    const response = await axios.get(
      "https://musicrafters.store/server/api/printful/sync"
    );
    console.log("Printful სინქრონიზაცია წარმატებულია:", response.data.message);
  } catch (error) {
    console.error("სინქრონიზაციის შეცდომა:", error.message);
  }
});

//
const stockRoutes = require("./routes/stockRoutes");
app.use("/server/api/stock", stockRoutes);
// პორტი
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 სერვერი მუშაობს პორტზე ${PORT}`);
});
// http://localhost:3001/server
// "https://ferraritifo.live/server/api/printful/sync"
// https://ferraritifo.live/server/api/printful/sync
