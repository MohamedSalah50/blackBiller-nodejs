import joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const register = {
  body: joi
    .object()
    .keys({
      full_name: generalFields.full_name,
      email: generalFields.email,
      mobile: generalFields.mobile,
      password: generalFields.password,
      password_confirmation: generalFields.password_confirmation,
      country_code: generalFields.country_code,
    })
    .required(),
};

export const login = {
  body: joi
    .object()
    .keys({
      email: generalFields.email,
      mobile: generalFields.mobile.optional(),
      password: generalFields.password,
    })
    .required(),
};

export const updateProfileSchema = {
  body: joi
    .object()
    .keys({
      full_name: generalFields.full_name,
      email: generalFields.email,
      mobile: generalFields.mobile,
      password: generalFields.password,
      password_confirmation: generalFields.password_confirmation,
      dob: generalFields.dob,
      whatsapp_no: generalFields.whatsapp_no,
      zone: generalFields.zone,
    })
    .required(),
};

export const statusUpdateSchema = {
  body: joi
    .object()
    .keys({
      status: generalFields.status,
    })
    .required(),
};
