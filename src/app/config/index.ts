import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  reset_pass_secret: process.env.RESET_PASS_SECREATE,
  reset_pass_token_expires_in: process.env.RESET_PASS_EXPIRE_IN,
  reset_pass_link: process.env.RESET_PAS_LINK,
  emailSender: {
    email: process.env.EMAIL_SENDER_EMAIL,
    app_pass: process.env.EMAIL_SENDER_APP_PASS,
  },
};
