interface ICalculatePaginationOptions {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface ICalculatePaginationResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

const calculatePagination = (
  options: ICalculatePaginationOptions
): ICalculatePaginationResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default calculatePagination;
