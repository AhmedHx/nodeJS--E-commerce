const express = require("express");
const {
	addSubCategory,
	getSubCategory,
	getSubCategories,
	updateSubCategory,
} = require("../controller/subcategory.controller");
const {
	createSubCategoryValidator,
	getSubCategoryValidator,
} = require("../utils/validators/subcategory.valid");

const router = express.Router();

router
	.route("/")
	.post(createSubCategoryValidator, addSubCategory)
	.get(getSubCategories);
router
	.route("/:id")
	.get(getSubCategoryValidator, getSubCategory)
	.put(getSubCategoryValidator, updateSubCategory);

module.exports = router;
