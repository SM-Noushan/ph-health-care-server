import jwt from "jsonwebtoken";
import status from "http-status";
import AppError from "../error/AppError";

const decodeToken = (token: string, secret: jwt.Secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }
};

export default decodeToken;
