const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/product.controller");
const helpers = require("../helpers/helpers");

router.get("/", controller.getAllCategories);
router.get("/:id", helpers.getBreadcrumbs, controller.getCategoryById);

router.get(
    "/:categoryId/:subCategoryId",
    helpers.getBreadcrumbs,
    controller.getProductsBySubCategory // Corrected method name
);
router.get(
    "/:categoryId/:subCategoryId/:id",
    helpers.getBreadcrumbs,
    controller.getProductById
);

module.exports = router;
