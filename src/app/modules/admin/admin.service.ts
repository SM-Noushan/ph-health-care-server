import prisma from "../../utils/prisma";
import { AdminConstants } from "./admin.constant";
import { Admin, Prisma, UserStatus } from "../../../generated/prisma";
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

  const andConditions: Prisma.AdminWhereInput[] = [{ isDeleted: false }];

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

const getAdmin = async (id: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: { id, isDeleted: false },
  });

  return admin;
};

const updateAdmin = async (
  id: string,
  data: Partial<Prisma.AdminUpdateInput>
): Promise<Admin> => {
  const admin = await prisma.admin.update({
    where: { id, isDeleted: false },
    data,
  });
  return admin;
};

const deleteAdmin = async (id: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const admin = await tx.admin.delete({
      where: { id },
    });
    await tx.user.delete({
      where: { email: admin.email },
    });
  });
};

const softDeleteAdmin = async (id: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const admin = await tx.admin.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true },
    });
    await tx.user.update({
      where: { email: admin.email },
      data: { status: UserStatus.DELETED },
    });
  });
};

export const AdminService = {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
