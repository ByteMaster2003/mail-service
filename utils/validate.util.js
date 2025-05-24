import httpStatus from "http-status";
import { ZodError } from "zod";

import { ApiError } from "./api-error.util.js";

export const validate = (schema) => (req, _, next) => {
  const { params, query, body } = schema;
  const { params: reqParams, query: reqQuery, body: reqBody } = req;

  try {
    if (params) params.parse(reqParams);
    if (query) query.parse(reqQuery);
    if (body) body.parse(reqBody);

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));

      return next(new ApiError(httpStatus.BAD_REQUEST, "Validation Error", errors));
    }
    return next(error);
  }
};