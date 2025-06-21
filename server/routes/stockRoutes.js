const express = require("express");
const router = express.Router();
const Design = require("../Models/Design");

router.patch("/update-stock", async (req, res) => {
  const { items } = req.body;

  try {
    const updatedStock = [];

    for (const item of items) {
      const { printfulProductId, quantity } = item;

      const design = await Design.findOne({ printfulProductId });

      if (!design) {
        continue;
      }

      //
      design.stock = Math.max((design.stock || 0) - quantity, 0);
      await design.save();

      updatedStock.push({
        printfulProductId,
        stock: design.stock,
      });
    }

    res.json({ updatedStock });
  } catch (err) {
    console.error("Error Of Update STOCK:", err);
    res.status(500).json({ message: "Failed to update STOCK." });
  }
});

module.exports = router;
