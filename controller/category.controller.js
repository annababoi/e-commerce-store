const Categories = require("../model/Categories");

exports.getCategory = async (req, res, next) => {
  try {
    const categoriesRespose = await Categories.find({});
    res.render("index", {
      categories: categoriesRespose,
      pageTitle: "main",
      path: "/",
    });
  } catch (e) {
    next(e);
  }
};
