const { check } = require("express-validator");
const validationMiddleware = require("../../middleware/validator");

exports.getSubCategoryValidator = [
	check(`id`).isMongoId().withMessage("Invalid ID format"),
	validationMiddleware,
];
exports.createSubCategoryValidator = [
	check(`name`)
		.notEmpty()
		.withMessage("SubCategory name is required")
		.isLength({ min: 3 })
		.withMessage("SubCategory name is too short")
		.isLength({ max: 15 })
		.withMessage("SubCategory name is too long"),
	check("categoryID").isMongoId().withMessage("Category ID is not valid"),
	validationMiddleware,
];

exports.updateSubCategoryValidator = [
	check(`name`)
		.notEmpty()
		.withMessage("SubCategory name is required")
		.isLength({ min: 3 })
		.withMessage("SubCategory name is too short")
		.isLength({ max: 15 })
		.withMessage("SubCategory name is too long"),
	validationMiddleware,
];
