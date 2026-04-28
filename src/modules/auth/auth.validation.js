import joi from "joi";

export const register = {
  body: joi.object()
    .keys({
      full_name: joi.string().max(255).required(),
      email: joi.string().email().optional().allow(null, ""),
      mobile: joi.string().required(),
      password: joi.string().min(8).required(),
      password_confirmation: joi.string()
        .valid(joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
      country_code: joi.string().optional().allow(null, ""),
    })
    .required(),
};

export const login = {
  body: joi.object()
    .keys({
      email: joi.string().email().optional().allow(null, ""),
      mobile: joi.string().optional().allow(null, ""),
      password: joi.string().required(),
    })
    .required(),
};

export const updateProfileSchema = {
  body: joi.object()
    .keys({
      full_name: joi.string().max(255).optional(),
      email: joi.string().email().optional(),
      mobile: joi.string().optional(),
      password: joi.string().min(8).optional(),
      password_confirmation: joi.string()
        .valid(joi.ref("password"))
        .optional()
        .messages({ "any.only": "Passwords do not match" }),
      dob: joi.date().optional(),
      whatsapp_no: joi.string().max(20).optional(),
      zone: joi.string().max(255).optional(),
    })
    .required(),
};

export const statusUpdateSchema = {
  body: joi.object()
    .keys({
      status: joi.string()
        .valid("active", "deleted", "suspended", "inactive", "banned")
        .required(),
    })
    .required(),
};
