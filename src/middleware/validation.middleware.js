import { asyncHandler } from "../utils/response.js";
import joi from "joi";

export const generalFields = {
  full_name: joi.string().max(255).required(),
  email: joi.string().email().optional().allow(null, ""),
  mobile: joi.string().required(),
  password: joi.string().min(8).required(),
  password_confirmation: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
  country_code: joi.string().optional().allow(null, ""),
  dob: joi.date().optional(),
  whatsapp_no: joi.string().max(20).optional(),
  zone: joi.string().max(255).optional(),
  status: joi
    .string()
    .valid("active", "deleted", "suspended", "inactive", "banned")
    .required(),
};

export const validation = (schema) => {
  return asyncHandler(async (req, res, next) => {
    const validationErrors = [];

    for (const key of Object.keys(schema)) {
      try {
        await schema[key].validateAsync(req[key], { abortEarly: false });
      } catch (error) {
        validationErrors.push(error.details);
      }
    }

    if (validationErrors.length) {
      return res
        .status(400)
        .json({ err_message: "validation error", error: validationErrors });
    }

    return next();
  });
};
