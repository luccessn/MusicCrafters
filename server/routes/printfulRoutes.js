const express = require("express");
const router = express.Router();
const Design = require("../Models/Design");
const printfulAPI = require("../utils/printful");

// 📌 ROUTE: Printful-დან მონაცემების წამოღება და ბაზაში შენახვა
router.get("/sync", async (req, res) => {
  try {
    const productsResponse = await printfulAPI.get("/store/products");
    const products = productsResponse.data.result;

    for (const product of products) {
      const productId = product.id;
      const productDetailsResponse = await printfulAPI.get(
        `/store/products/${productId}`
      );
      const productDetails = productDetailsResponse.data.result;

      const name = productDetails.sync_product?.name || "უცნობი სახელი";
      const variants = productDetails.sync_variants || [];
      const files = productDetails.sync_product?.files || [];
      const price =
        productDetails.sync_product?.retail_price ||
        Math.min(
          ...variants.map((v) => parseFloat(v.retail_price) || Infinity)
        );

      const minPrice =
        variants.length > 0
          ? Math.min(
              ...variants.map((v) => parseFloat(v.retail_price) || Infinity)
            )
          : null;

      const maxPrice =
        variants.length > 0
          ? Math.max(
              ...variants.map((v) => parseFloat(v.retail_price) || -Infinity)
            )
          : null;

      const existingDesign = await Design.findOne({
        printfulProductId: productId.toString(),
      });

      let images = existingDesign?.images || {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
      };

      const preparedVariants = await Promise.all(
        variants.map(async (variant) => {
          const variantName = variant.name || "";
          const size = variant.size || "უცნობია";
          const color = variant.color || "უცნობია";
          const retail_price = parseFloat(variant.retail_price || 0);

          // დავაგენერიროთ დამატებითი ინფო detail call-ით
          let color_code = "N/A";
          try {
            const productDetail = await printfulAPI.get(
              `/products/${variant.product.product_id}`
            );
            const detailedVariant = productDetail.data.result.variants.find(
              (v) => v.id === variant.variant_id
            );
            color_code = detailedVariant?.color_code || "N/A";
          } catch (e) {
            console.warn(
              `Error fetching color_code for variant ${variant.variant_id}: ${e.message}`
            );
          }

          return {
            variant_id: variant.variant_id,
            size,
            color,
            color_code,
            retail_price,
            preview_url: variant.files?.[0]?.preview_url || "",
            files: variant.files || [],
          };
        })
      );
      await Design.findOneAndUpdate(
        { printfulProductId: productId.toString() },
        {
          name,
          printfulProductId: productId.toString(),
          images,
          // preview,
          type: "tshirt",
          variants: preparedVariants,
          price,
          minPrice,
          maxPrice,
          stock: existingDesign ? existingDesign.stock : 100,
        },
        { upsert: true, new: true }
      );

      // console.log(`🛍️ პროდუქტი "${name}" სინქრონიზირებულია DB-ში.`);
      // console.log(`💰 პროდუქტის გარე ფასი: ${price}`);
      // // console.log(JSON.stringify(productDetails, null, 2));

      // // აქ გამოვიტანო მხოლოდ პირველი variant-ის პირველი 2 ფოტო
      // if (variants.length > 0) {
      //   const firstVariant = variants[0];
      //   for (let j = 0; j < Math.min(2, firstVariant.files.length); j++) {
      //     const file = firstVariant.files[j];
      //     console.log(
      //       `- პირველი variant-ის ფოტო #${j + 1}: ${file.preview_url}`
      //     );
      //   }
      // }
    }
    // MONGODB is LOG - ი
    // const allDesigns = await Design.find({});
    // allDesigns.forEach((design) => {
    //   console.log(
    //     `\n🖼 Design: ${design.name} (ID: ${design.printfulProductId})`
    //   );
    //   console.log(`Photos:`, design.images);
    //   design.variants.forEach((v) => {
    //     console.log(
    //       `- ID: ${v.id}, Size: ${v.size}, Color: ${v.color}, Price: ${v.retail_price}`
    //     );
    //   });
    // });

    res.json({ message: "Printful Designs synchronized successfully." });
  } catch (err) {
    console.error("❌ შეცდომა:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});
//
//
router.get("/get", async (req, res) => {
  //getPrintfulDesigns
  try {
    const id = req.query.id;

    if (id) {
      const design = await Design.findOne({ printfulProductId: id });

      if (!design) {
        return res.status(404).json({ error: "დიზაინი ვერ მოიძებნა" });
      }

      return res.json(design);
    } else {
      const allDesigns = await Design.find();
      return res.json(allDesigns);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
