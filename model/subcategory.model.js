const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "subCategory name is required"],
			unique: [true, "subCategory must be unique"],
			trim: true,

			minlength: [
				3,
				"subCategory name must be at least 3 characters long",
			],
			maxlength: [
				32,
				"subCategory name must be at most 32 characters long",
			],
		},
		slug: {
			type: String,
			lowercase: true,
		},
		image: String,
		mainCategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "MainCategory is required"],
		},
	},
	{ timeseries: true }
);

const CategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = CategoryModel;
