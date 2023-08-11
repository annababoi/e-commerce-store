const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/category.controller");

router.get("/", controller.getCategory);
router.get("/:id", getBreadcrumbs, controller.getOneCategory);

router.get(
  "/:categoryId/:subCategoryId",
  getBreadcrumbs,
  controller.getProducts
);
router.get(
  "/:categoryId/:subCategoryId/:id",
  getBreadcrumbs,
  controller.getProduct
);

module.exports = router;

function getBreadcrumbs(req, res, next) {
  const urls = req.originalUrl.split("/");

  res.breadcrumbs = urls.map((url, i) => {
    url = url.includes("-") ? url.split("-").join(" ") : url;

    return {
      breadcrumbName:
        url === "" ? "Home" : url.charAt(0).toUpperCase() + url.slice(1),
      breadcrumbUrl: url === "" ? "/" : `${urls.slice(0, i + 1).join("/")}`,
      active: i === urls.length - 1,
    };
  });
  next();
}
