import { createTransport } from "nodemailer";
import { AppConfig } from "../env.config.js";

const user = AppConfig.SENDER;
const pass = AppConfig.PASS_KEY;
const zohoMail = AppConfig.RECEIVER;
const zohoPass = AppConfig.ZOHO_PASS_KEY;

const transporter = new createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user,
		pass,
	},
});

const zohoTransporter = new createTransport({
	host: "smtp.zoho.in",
	port: 465,
	secure: true,
	auth: {
		user: zohoMail,
		pass: zohoPass,
	},
});

const sendGmail = async (to, subject, text) => {
	const mailOptions = {
		from: user,
		to,
		subject,
		text,
	};

	return await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

const sendZohoMail = async (to, subject, text) => {
	const mailOptions = {
		from: `Vivek Sahani <${zohoMail}>`,
		to,
		subject,
		text,
	};

	return await zohoTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

const sendEmailFromPortfolio = async (name, email, message) => {
	const mailOptions = {
		from: user,
		to: zohoMail,
		subject: "Message From Portfolio",
		html: `
      <html>
        <body>
          <div
            style="
              border: 1px solid rgb(164, 164, 164);
              border-radius: 1rem;
              padding: 3rem;
              margin: 0 15rem;
            "
          >
            <p>
              <span
                style="font-weight: 600; font-size: larger; color: rgb(3, 93, 158)"
                >from: </span
              >${name}
            </p>
            <p>
              <span
                style="font-weight: 600; font-size: larger; color: rgb(3, 93, 158)"
                >email: </span
              >${email}
            </p>
            <p>
						<span
                style="font-weight: 600; font-size: larger; color: rgb(3, 93, 158)"
                >message: </span
              >
              ${message}
            </p>
          </div>
        </body>
      </html>
    `,
	};

	return await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

sendZohoMail("viveksahani2003@duck.com", "Test Subject", "Test Email Body");

export { sendGmail, sendZohoMail, sendEmailFromPortfolio };
