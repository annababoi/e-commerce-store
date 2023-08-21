const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/currency.controller");

router.post("/", controller.getConvert);

module.exports = router;
