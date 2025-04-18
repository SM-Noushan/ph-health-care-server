import prisma from "../../utils/prisma";
import { AdminConstants } from "./admin.constant";
import { Prisma } from "../../../generated/prisma";
import calculatePagination from "../../utils/calculatePagination";

const getAdmins = async (query: any) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy = "createdAt",
    sortOrder = "desc",
    ...filterQuery
  } = query;

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

  const options = calculatePagination({ page, limit, sortBy, sortOrder });

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: options.skip,
    take: options.limit,
    orderBy: {
      [options.sortBy]: options.sortOrder,
    },
  });

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    meta: {
      page: options.page,
      limit: options.limit,
      total,
      totalPages: Math.ceil(total / options.limit),
    },
    data: result,
  };
};

const getAdmin = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  });

  return admin;
};

const updateAdmin = async (
  id: string,
  data: Partial<Prisma.AdminUpdateInput>
) => {
  const admin = await prisma.admin.update({
    where: { id },
    data,
  });
  return admin;
};

export const AdminService = { getAdmins, getAdmin, updateAdmin };
