import { AdminConstants } from "./admin.constant";
import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAdmins = async (query: any) => {
  const { searchTerm, ...filterQuery } = query;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (searchTerm)
    andConditions.push({
      OR: AdminConstants.searchTermFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });

  if (Object.keys(filterQuery).length > 0) {
    andConditions.push({
      AND: Object.keys(filterQuery).map((key) => ({
        [key]: { equals: filterQuery[key] },
      })),
    });
  }

  const whereConditions = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return { data: result };
};

export const AdminService = { getAdmins };
