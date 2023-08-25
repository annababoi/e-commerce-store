const router = require("express").Router({ mergeParams: true });

const controller = require("../controllers/auth.controller");
const mdlwr = require("../middlewares/auth.mdlwr");

router.get("/signup", controller.renderSignup);
router.post("/signup", mdlwr.isNewUserValid, controller.signup);

router.get("/signin", controller.renderSignin);
router.post("/signin", mdlwr.isBodyValid, controller.signin);

module.exports = router;
