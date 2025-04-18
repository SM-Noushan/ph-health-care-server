import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12"),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRATION as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION as string,
};
