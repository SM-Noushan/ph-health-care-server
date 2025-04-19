import path from "path";
import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12"),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as Secret,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRATION as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as Secret,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION as string,
  jwtResetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET as Secret,
  jwtResetPasswordExpiresIn: process.env.JWT_RESET_PASSWORD_EXPIRATION as string,
  resetPasswordUrl: process.env.RESET_PASSWORD_URL as string,
  transporterEmail: process.env.TRANSPORTER_EMAIL as string,
  transporterPassword: process.env.TRANSPORTER_PASSWORD as string,
};
