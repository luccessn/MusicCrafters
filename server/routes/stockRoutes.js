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

      // ვვარაუდობთ, რომ Design მოდელს აქვს 'stock' ველი
      design.stock = Math.max((design.stock || 0) - quantity, 0);
      await design.save();

      updatedStock.push({
        printfulProductId,
        stock: design.stock,
      });
    }

    res.json({ updatedStock });
  } catch (err) {
    console.error("მარაგის განახლების შეცდომა:", err);
    res.status(500).json({ message: "მარაგის განახლება ვერ მოხერხდა." });
  }
});

module.exports = router;
