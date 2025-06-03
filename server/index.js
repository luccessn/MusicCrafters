require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Design = require("./Models/Design");
const printfulAPI = require("./utils/printful");

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
    console.log("✅ კავშირი MongoDB-თან წარმატებით დამყარდა");
  })
  .catch((err) => console.error("❌ MongoDB კავშირის შეცდომა:", err));

// Root
app.get("/", (req, res) => {
  res.send("API მუშაობს");
});

// PayPal
const paypalRoutes = require("./routes/paymentRoutes");
app.use("/api/paypal", paypalRoutes);

//
const printfulRoutes = require("./routes/printfulRoutes");
app.use("/api/printful", printfulRoutes);
//
const stockRoutes = require("./routes/stockRoutes");
app.use("/api/stock", stockRoutes);
// პორტი
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 სერვერი მუშაობს პორტზე ${PORT}`);
});

// CvImages
// app.get("/getcvImages", async (req, res) => {
//   try {
//     const image = req.query.id
//       ? await CvImagesModel.findOne({ id: req.query.id })
//       : await CvImagesModel.find();

//     if (!image) return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" });
//     res.json(image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// const CvImagesModel = require("./Models/cvImages");
// const CaseImagesModel = require("./Models/caseImages");
// const HodImagesModel = require("./Models/hoodImages");
// const TshImagesModel = require("./Models/tshirtImages");
