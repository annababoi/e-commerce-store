const bcrypt = require("bcrypt");

const authMongoUtils = require("../services/mongo.utils");

exports.renderSignup = async (req, res, next) => {
  res.render("signup", {
    pageTitle: "Sign up",
    errorMessage: "",
    inputValues: {},
  });
};

exports.renderSignin = async (req, res, next) => {
  res.render("signin", {
    pageTitle: "Sign in",
    errorMessage: "",
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { email, name, age, password, phone } = req.body;
    await authMongoUtils.createUser({ email, name, age, password, phone });

    res.redirect("signin");
  } catch (e) {
    next(e);
    res.render("signup", { errorMessage: e.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authMongoUtils.findUserByEmail(email);

    if (!user) {
      return res.status(401).render("signin", {
        pageTitle: "Signin",
        errorMessage: "Invalid email or password",
        user,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render("signin", {
        pageTitle: "Sign in",
        errorMessage: "Invalid email or password",
      });
    }

    await authMongoUtils.createTokens(user._id);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};
