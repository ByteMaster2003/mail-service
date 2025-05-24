import httpStatus from "http-status";

import {
	sendEmailFromPortfolio,
	sendGmail,
} from "../service/nodemailer.service.js";
import { catchAsync } from "../utils/catch-async.util.js";

export const composeMail = catchAsync(async (req, res) => {
	const { name, email, message, state } = req.body;

	await sendGmail(
		email,
		"📬 Got your message – Let's connect!",
		`
Hi ${name}, 

Thanks for reaching out, your message has landed safely in my inbox.

I’ll get back to you as soon as I can. If this was unintentional or you didn’t expect this email, feel free to ignore it.
If your message is time-sensitive, feel free to reply directly to this email

Regards,  
Vivek Sahani
—
🔗 Portfolio: https://viveksahani.com 
💻 GitHub: https://viveksahani.com/github
📇 LinkedIn: https://viveksahani.com/linkedin
		`
	);

	await sendEmailFromPortfolio(name, email, message);
	return res.status(httpStatus.OK).json({
		statusCode: httpStatus.OK,
		message: "Mail sent successfully",
		data: {
			state,
		},
	});
});
