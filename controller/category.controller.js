const expressAsyncHandler = require("express-async-handler");
const CategoryModel = require("../model/category.model");
const slugify = require("slugify");

//@description Create a new category
//@route POST /api/v1/categories
//@access admin 
exports.addCategory = (req, res) => {
    const name = req.body.name;
    CategoryModel.create({ name, slug: slugify(name) }).then((category) => {
        res.status(201).json({ data: category });
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    });


};


//@description Get the Categories
//@route GET /api/v1/categories
//@access public 
exports.getCategories = function (req, res) {
    const page = req.query.page * 1 || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    CategoryModel.find().skip(skip).limit(limit).then((categories) => {

        res.status(200).json({ result: categories.length, page: page, categories: categories });
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    });
};

//@description Get the specified category
//@route GET /api/v1/categories/:id
//@access public 
exports.getCategory = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
        res.status(400).json({ result: "category not found" });
    }
    res.status(200).json({ result: "category found", category: category });
});




//@description Update the specified category
//@route PUT /api/v1/categories/:id
//@access private 
exports.updateCategory = function (req, res) {
    const { id } = req.params;
    const { name } = req.body;
    CategoryModel.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true },)
        .then((category) => {
            res.status(200).json({ result: "category found", category: category });
        }).catch((error) => {
            res.status(400).json({ result: "category not found" });

        });
};


//@description Update the specified category
//@route DELETE /api/v1/categories/:id
//@access private 
exports.deleteCategory = function (req, res) {
    const { id } = req.params;
    CategoryModel.findByIdAndDelete(id)
        .then((category) => {
            res.status(200).json({ result: "category is deleted" });
        }).catch((error) => {
            res.status(400).json({ error: error.message });

        });
};


