import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFilePath = join(__dirname, '.env');
dotenv.config({ path: envFilePath })

export const AppConfig = {
  PORT: process.env.PORT || 8080,
  RECEIVER: process.env.PORTFOLIO_RECEIVER,
  SENDER: process.env.SENDER_GMAIL,
  PASS_KEY: process.env.GOOGLE_PASS_KEY
}
