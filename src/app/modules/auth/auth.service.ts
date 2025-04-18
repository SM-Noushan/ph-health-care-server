import config from "../../config";
import createToken from "./auth.utils";
import prisma from "../../utils/prisma";
import { UserUtils } from "../user/user.utils";
import { ILoginUser } from "./auth.interface";
import AppError from "../../error/AppError";
import status from "http-status";

const loginUser = async (payload: ILoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordMatched = UserUtils.comparePassword(
    payload.password,
    user.password
  );
  if (!isPasswordMatched)
    throw new AppError(status.UNAUTHORIZED, "Password is incorrect");

  const accessToken = createToken(
    { email: user.email, role: user.role },
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn
  );

  const refreshToken = createToken(
    { email: user.email, role: user.role },
    config.jwtRefreshSecret,
    config.jwtRefreshExpiresIn
  );

  return {
    accessToken,
    needPasswordChange: user.needPasswordChange,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
