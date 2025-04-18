import status from "http-status";
import config from "../../config";
import createToken from "./auth.utils";
import prisma from "../../utils/prisma";
import AppError from "../../error/AppError";
import { UserUtils } from "../user/user.utils";
import decodeToken from "../../utils/decodeToken";
import { IJwtTokenPayload, ILoginUser } from "./auth.interface";

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

const refreshToken = async (token: string) => {
  const decodedData = decodeToken(
    token,
    config.jwtRefreshSecret
  ) as IJwtTokenPayload;

  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = createToken(
    { email: decodedData.email, role: decodedData.role },
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn
  );

  return { accessToken, needPasswordChange: isUserExists.needPasswordChange };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
