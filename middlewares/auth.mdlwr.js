const authValidator = require("../validators/auth.validator");
const ApiError = require("../helpers/error");

module.exports = {
  isBodyValid: async (req, res, next) => {
    try {
      const validate = authValidator.loginValidator.validate(req.body);

      if (validate.error) {
        const errorMessage = validate.error.message;
        return res.status(400).render("signin", {
          pageTitle: "Sign in",
          errorMessage: errorMessage,
        });
      }

      req.body = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },
  isNewUserValid: async (req, res, next) => {
    try {
      const validate = authValidator.newUserValidator.validate(req.body);

      if (validate.error) {
        const errorMessage = validate.error.message;
        return res.status(400).render("signup", {
          pageTitle: "Sign up",
          errorMessage: errorMessage,
        });
      }

      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  },
};
