import status from "http-status";
import { AdminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmins();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result.data,
  });
});

export const AdminController = { getAdmins };
