const { check } = require("express-validator");
const validationMiddleware = require("../../middleware/validator");

exports.getCategoryValidator = [
    check(`id`).isMongoId().withMessage("Invalid ID format"),
    validationMiddleware,
];
exports.createCategoryValidator = [
    check(`name`)
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3 })
        .withMessage("Category name is too short")
        .isLength({ max: 15 })
        .withMessage("Category name is too long"),
    validationMiddleware,
];

exports.updateCategoryValidator = [
    check(`name`)
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3 })
        .withMessage("Category name is too short")
        .isLength({ max: 15 })
        .withMessage("Category name is too long"),
    validationMiddleware,
];


