import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

export const RateLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000,
	max: 3,
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: false,
	handler: (_, res) => {
		res.status(httpStatus.TOO_MANY_REQUESTS).json({
			success: false,
			message: httpStatus[httpStatus.TOO_MANY_REQUESTS],
		});
	},
});
