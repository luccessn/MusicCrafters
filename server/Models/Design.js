const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  name: String,
  printfulProductId: String,
  images: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
  },
  variants: [
    {
      variant_id: Number,
      size: String,
      color: String,
      color_code: String,
      retail_price: String,
      preview_url: String,
    },
  ],
  // type: String,
  price: String,
  minPrice: String,
  maxPrice: String,
  stock: { type: Number, default: 0 }, // აქ დაამატე stock
});

module.exports = mongoose.model("Design", designSchema);
