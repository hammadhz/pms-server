const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
      .required()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/
      )
      .message("Password is not Strong"),
  });
  return schema.validate(data);
};

const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .required()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/
      )
      .message("Enter valid Credentials"),
  });
  return schema.validate(data);
};

module.exports = { signinValidation, signupValidation };
