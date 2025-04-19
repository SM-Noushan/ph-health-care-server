import status from "http-status";
import config from "../../config";
import createToken from "./auth.utils";
import prisma from "../../utils/prisma";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/AppError";
import { TChangePassword } from "./auth.type";
import { UserUtils } from "../user/user.utils";
import decodeToken from "../../utils/decodeToken";
import resetEmail from "../../sendEmail/resetEmail";
import { UserStatus } from "../../../generated/prisma";
import { IJwtTokenPayload, ILoginUser } from "./auth.interface";
import { Admin, UserRole } from "./../../../generated/prisma/index.d";

const loginUser = async (payload: ILoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
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
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = createToken(
    { email: decodedData.email, role: decodedData.role },
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn
  );

  return { accessToken, needPasswordChange: isUserExists.needPasswordChange };
};

const changePassword = async (user: JwtPayload, payload: TChangePassword) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const isPasswordMatched = UserUtils.comparePassword(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordMatched)
    throw new AppError(status.UNAUTHORIZED, "Password is incorrect");

  const hashedPassword = UserUtils.hashedPassword(payload.newPassword);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
};

const forgotPassword = async (email: string) => {
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });
  let userInfo: Admin = await prisma.admin.findUniqueOrThrow({
    where: {
      email: isUserExists.email,
    },
  });
  // if (
  //   isUserExists.role === UserRole.SUPER_ADMIN ||
  //   isUserExists.role === UserRole.ADMIN
  // )
  // userInfo = await prisma.admin.findUniqueOrThrow({
  //   where: {
  //     email: isUserExists.email,
  //   },
  // });
  // else if (isUserExists.role === UserRole.SUPER_ADMIN)
  //   userInfo = await prisma.doctor.findUniqueOrThrow({
  //     where: {
  //       email: isUserExists.email,
  //     },
  //   });
  // else isUserExists.role === UserRole.SUPER_ADMIN;
  // userInfo = await prisma.patient.findUniqueOrThrow({
  //   where: {
  //     email: isUserExists.email,
  //   },
  // });

  const resetPasswordToken = createToken(
    { email: isUserExists.email, role: isUserExists.role },
    config.jwtResetPasswordSecret,
    config.jwtResetPasswordExpiresIn
  );
  const resetPasswordUrl = `${config.resetPasswordUrl}?id=${isUserExists.id}&token=${resetPasswordToken}`;
  await resetEmail(isUserExists.email, userInfo.name, resetPasswordUrl);
  return { resetPasswordToken, resetPasswordUrl };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
