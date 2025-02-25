const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("product list");
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`product id ${productId}`);
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  res.json({
    message: "Product created successfully",
    product: newProduct,
  });
});

module.exports = router;