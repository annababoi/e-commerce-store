const Categories = require("../models/Categories");
const Products = require("../models/Products");

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

    const category = categoriesRespose.find((res) => res.id === id);

    res.render("category", {
      categories: categoriesRespose,
      category,
      breadcrumbs: res.breadcrumbs,
      subCategories: category?.categories,
      pageTitle: category.page_title,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    const categoriesRespose = await Categories.find({});
    const category = categoriesRespose.find((res) => res.id === categoryId);

    const productRespose = await Products.find({
      primary_category_id: subCategoryId,
    });
    res.render("products", {
      categories: categoriesRespose,
      category,
      subCategoryId,
      breadcrumbs: res.breadcrumbs,
      product: productRespose,
      pageTitle: productRespose.page_title,
    });
  } catch (e) {
    next(e);
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const { id, categoryId } = req.params;

    const productRespose = await Products.findOne({
      id,
    });
    const categoriesRespose = await Categories.find({});
    const category = categoriesRespose.find((res) => res.id === categoryId);

    let breadcrumbs = res.breadcrumbs.map((res) => {
      return res.breadcrumbName == productRespose.id
        ? { ...res, breadcrumbName: productRespose.name }
        : res;
    });
    res.render("product", {
      categories: categoriesRespose,
      category,
      breadcrumbs,
      product: productRespose,
      pageTitle: productRespose.page_title,
    });
  } catch (e) {
    next(e);
  }
};
