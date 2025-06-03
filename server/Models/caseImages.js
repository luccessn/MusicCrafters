const mongoose = require("mongoose");

const CaseImagesSchema = new mongoose.Schema({
  id: String,
  name: String,
  descr: String,
  price: String,
  images: {
    img1: String,
    img2: String,
    img3: String,
  },
  type: String,
});

const CaseImagesModel = mongoose.model("caseimages", CaseImagesSchema);
module.exports = CaseImagesModel;
