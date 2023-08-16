const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/product.controller");
const helpers = require("../helpers/helpers");

router.get("/", controller.getCategory);
router.get("/:id", helpers.getBreadcrumbs, controller.getOneCategory);

router.get(
  "/:categoryId/:subCategoryId",
  helpers.getBreadcrumbs,
  controller.getProducts
);
router.get(
  "/:categoryId/:subCategoryId/:id",
  helpers.getBreadcrumbs,
  controller.getProduct
);

module.exports = router;
