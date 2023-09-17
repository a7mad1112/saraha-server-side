import joi from "joi";
export const signupSchema = joi.object({
  userName: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  cPassword: joi.string().valid(joi.ref('password')).required(),
  gender: joi.string().valid("Male", "Female"),
  age: joi.number().integer().min(20).max(80).required(),
})

export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': "Email is required",
    'string.email': "plz enter a valid email"
  }),
  password: joi.string().required().messages({
    'string.empty': "Password is required",
  }),
})