import httpStatus from "http-status";

import { sendEmailFromPortfolio } from "../service/nodemailer.service.js";
import { catchAsync } from "../utils/catch-async.util.js";

export const composeMail = catchAsync(async (req, res) => {
	const { name, email, message, state } = req.body;

	await sendEmailFromPortfolio(name, email, message);
	return res.status(httpStatus.OK).json({
		statusCode: httpStatus.OK,
		message: "Mail sent successfully",
		data: {
			state,
		},
	});
});
