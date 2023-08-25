const Joi = require("joi");
const regexp = require("../config/regexp.enum"); // Make sure you include the correct regexp file
const ApiError = require("../helpers/error");

module.exports = {
  newUserValidator: Joi.object({
    name: Joi.string()
      .min(2)
      .max(40)
      .required()
      .default("")
      .error(new ApiError("Name must be between 2 and 40 characters")),
    email: Joi.string()
      .regex(regexp.EMAIL)
      .required()
      .lowercase()
      .trim()
      .error(new ApiError("Invalid email format")),
    password: Joi.string()
      .regex(regexp.PASSWORD)
      .required()
      .error(
        new ApiError(
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
      ),
    age: Joi.number()
      .min(1)
      .max(120)
      .error(new ApiError("Age must be between 1 and 120")),
    phone: Joi.string()
      .regex(regexp.PHONE)
      .required()
      .error(new ApiError("Invalid phone number format")),
  }),
  loginValidator: Joi.object({
    email: Joi.string()
      .regex(regexp.EMAIL)
      .lowercase()
      .trim()
      .required()
      .error(new ApiError("Invalid email format")),
    password: Joi.string()
      .regex(regexp.PASSWORD)
      .required()
      .error(new ApiError("Invalid password")),
  }),
};
