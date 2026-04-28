import { asyncHandler } from "../utils/response.js";

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
