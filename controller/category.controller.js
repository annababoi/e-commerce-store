const Categories = require("../model/Categories");

exports.getCategory = async (req, res, next) => {
  try {
    const categoriesRespose = await Categories.find({});

    res.render("index", {
      categories: categoriesRespose,
      pageTitle: "Home",
    });
  } catch (e) {
    next(e);
  }
};

exports.getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoriesRespose = await Categories.find({});

    const categoryRespose = await Categories.findOne({ id: id });
    res.render("category", {
      categories: categoriesRespose,
      category: categoryRespose,
      pageTitle: categoryRespose.page_title,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
