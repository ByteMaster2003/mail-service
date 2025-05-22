import { z } from "zod";

export const composeMailSchema = {
	query: z.object({}),
	params: z.object({}),
	body: z.object({
		name: z.string({ required_error: "name is required!" }),
		email: z.string({ required_error: "email is required!" }).email("Invalid email!"),
		message: z.string({ required_error: "message is required!" })
	})
}
