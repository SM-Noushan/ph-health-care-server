import { UserUtils } from "./user.utils";
import { PrismaClient, UserRole } from "../../../generated/prisma";

const prisma = new PrismaClient();

const createAdmin = async (payload: any) => {
  const hashedPassword = UserUtils.hashedPassword(payload.password);
  const userData = {
    password: hashedPassword,
    email: payload.admin.email,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction([
    prisma.user.create({
      data: userData,
    }),
    prisma.admin.create({
      data: payload.admin,
    }),
  ]);

  return { data: result[1] };
};

export const UserService = { createAdmin };
