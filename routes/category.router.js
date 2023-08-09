const router = require("express").Router({ mergeParams: true });
const controller = require("../controller/category.controller");

router.get("/", controller.getCategory);
router.get("/categories/:id", controller.getOneCategory);

module.exports = router;
