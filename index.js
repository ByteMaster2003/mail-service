import express from "express";
import helmet from "helmet";
import httpStatus from "http-status";

import { AppConfig } from "./env.config.js";
import { RateLimiter } from "./utils/rate-limiter.js";
import { validate } from "./utils/validate.util.js";
import { composeMailSchema } from "./validations/mail.validation.js";
import { composeMail } from "./controllers/mail.controller.js";
import { ApiError, errorConverter, errorHandler } from "./utils/api-error.util.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set security HTTP headers
app.use(helmet());

// Enable trust proxy
app.set("trust proxy", 1);

// v1 api routes
app.post("/compose", RateLimiter, validate(composeMailSchema), composeMail);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(AppConfig.PORT, () => {
	console.log("Mail service started")
});
