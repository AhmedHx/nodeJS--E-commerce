const express = require("express");
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller.js");
const { getCategoryValidator } = require("../utils/validators/category.valid.js");
const router = express.Router();

router.route("/").post(addCategory).get(getCategories);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
