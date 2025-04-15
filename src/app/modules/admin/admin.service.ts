import { AdminConstants } from "./admin.constant";
import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAdmins = async (query: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm)
    andConditions.push({
      OR: AdminConstants.AdminSearchTermFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });

  const whereConditions = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return { data: result };
};

export const AdminService = { getAdmins };
