const express = require("express");
const product = require("./products");
const router = express.Router();

//if url has product
router.get("/", function (req, res) {
  res.render("home");
});
router.use("/products", product);

module.exports = router;
