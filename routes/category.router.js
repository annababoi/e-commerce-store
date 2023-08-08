const router = require("express").Router({ mergeParams: true });
const controller = require("../controller/category.controller");

router.get("/", controller.getCategory);

module.exports = router;
