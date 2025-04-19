import jwt, { Secret } from "jsonwebtoken";
import { IJwtTokenPayload } from "./auth.interface";

const createToken = (
  jwtPayload: IJwtTokenPayload,
  secret: Secret,
  expiresIn: string
): string =>
  jwt.sign(
    {
      email: jwtPayload.email,
      role: jwtPayload.role,
    },
    secret,
    {
      algorithm: "HS256",
      expiresIn,
    } as jwt.SignOptions
  );

export default createToken;
