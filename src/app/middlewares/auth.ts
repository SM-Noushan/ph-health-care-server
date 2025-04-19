import config from "../config";
import status from "http-status";
import prisma from "../utils/prisma";
import AppError from "../error/AppError";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import decodeToken from "../utils/decodeToken";
import { NextFunction, Request, Response } from "express";
import { UserRole, UserStatus } from "../../generated/prisma";

const auth = (...requiredRoles: UserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if token is present
    if (!token) throw new AppError(status.UNAUTHORIZED, "Unauthorized access");

    const decoded = decodeToken(token, config.jwtAccessSecret) as JwtPayload;

    const { email, role } = decoded;
    // validate user => check if user exists, is deleted, is blocked, is authorized
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    if (user.status === UserStatus.DELETED)
      throw new AppError(status.UNAUTHORIZED, "No user found");

    if (user.status === UserStatus.BLOCKED)
      throw new AppError(status.UNAUTHORIZED, "Your account is blocked");

    //   check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(role))
      throw new AppError(status.FORBIDDEN, "Forbidden access");

    req.user = decoded;
    next();
  });

export default auth;
