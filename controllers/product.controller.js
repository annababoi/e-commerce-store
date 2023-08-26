const mongoUtils = require("../services/mongo.utils"); // Update the path accordingly

exports.getAllCategories = async (req, res, next) => {
  try {
    const categoriesResponse = await mongoUtils.getAllCategories();
    res.render("index", {
      categories: categoriesResponse,
      pageTitle: "Home",
    });
  } catch (e) {
    next(e);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoriesResponse = await mongoUtils.getAllCategories();
    const category = categoriesResponse.find((cat) => cat.id === id);

    if (!category) {
      res.render("404", { pageTitle: "404" });
    } else {
      res.render("category", {
        categories: categoriesResponse,
        category,
        breadcrumbs: res.breadcrumbs,
        subCategories: category?.categories,
        pageTitle: category?.page_title,
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getProductsBySubCategory = async (req, res, next) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;

    const { productRespose, totalPages } =
      await mongoUtils.getProductsBySubCategory(subCategoryId, page, perPage);
    const categoriesResponse = await mongoUtils.getAllCategories();
    const category = categoriesResponse.find((cat) => cat.id === categoryId);

    if (!productRespose.length || !category) {
      res.render("404", { pageTitle: "404" });
    } else {
      res.render("products", {
        categories: categoriesResponse,
        category,
        subCategoryId,
        breadcrumbs: res.breadcrumbs,
        product: productRespose,
        totalPages,
        currentPage: page,
        pageTitle: productRespose.page_title,
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id, categoryId } = req.params;
    const productResponse = await mongoUtils.getProductById(id);
    const categoriesResponse = await mongoUtils.getAllCategories();
    const category = categoriesResponse.find((cat) => cat.id === categoryId);

    const breadcrumbs = res.breadcrumbs.map((bc) => {
      return bc.breadcrumbName === productResponse.id
        ? { ...bc, breadcrumbName: productResponse.name }
        : bc;
    });

    if (!productResponse || !category) {
      res.render("404", { pageTitle: "404" });
    } else {
      res.render("product", {
        categories: categoriesResponse,
        category,
        breadcrumbs,
        product: productResponse,
        pageTitle: productResponse?.page_title,
      });
    }
  } catch (e) {
    next(e);
  }
};
