import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAdmins = async () => {
  const result = await prisma.admin.findMany();
  return { data: result };
};

export const AdminService = { getAdmins };
