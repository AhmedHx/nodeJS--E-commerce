const expressAsyncHandler = require("express-async-handler");
const SubCategoryModel = require("../model/subcategory.model");
const slugify = require("slugify");
const ApiError = require("../utils/api.error");

//@description Create a new subcategory
//@route POST /api/v1/subcategories
//@access admin
exports.addSubCategory = expressAsyncHandler(async (req, res) => {
	const { name, categoryID } = req.body;
	const subCategory = await SubCategoryModel.create({
		name,
		slug: slugify(name),
		image: "",
		mainCategory: categoryID,
	});

	res.status(201).json({ data: subCategory });
});

//@description Get the specified category
//@route GET /api/v1/categories/:id
//@access public
exports.getSubCategory = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const subCategory = await SubCategoryModel.findById(id);
	if (!subCategory) {
		// res.status(400).json({ result: "category not found" });
		return next(new ApiError("category not found", 404));
	}
	res.status(200).json({ result: "category found", category: subCategory });
});

//@description Get the Categories
//@route GET /api/v1/subcategories
//@access public
exports.getSubCategories = function (req, res) {
	const page = req.query.page * 1 || 1;
	const limit = 6;
	const skip = (page - 1) * limit;
	SubCategoryModel.find()
		.skip(skip)
		.limit(limit).populate("mainCategory")
		.then((categories) => {
			res.status(200).json({
				result: categories.length,
				page: page,
				categories: categories,
			});
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
};

//@description Update the specified category
//@route PUT /api/v1/categories/:id
//@access private
exports.updateSubCategory = function (req, res) {
	const { id } = req.params;
	const { name, mainCategory } = req.body;

	SubCategoryModel.findByIdAndUpdate(
		{ _id: id },
		{ name, slug: slugify(name), mainCategory },
		{ new: true }
	)
		.then((category) => {
			res.status(200).json({
				result: "category found",
				category: category,
			});
		})
		// eslint-disable-next-line no-unused-vars
		.catch((_error) => {
			res.status(400).json({ result: "category not found" });
		});
};
