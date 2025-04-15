import status from "http-status";
import { AdminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";
import { AdminConstants } from "./admin.constant";
import sendResponse from "../../utils/sendResponse";
import pickValidQueryFields from "../../utils/pickValidField";

const getAdmins = catchAsync(async (req, res) => {
  const filteredQueryFields = pickValidQueryFields(
    req.query,
    AdminConstants.pickFields
  );

  const result = await AdminService.getAdmins(filteredQueryFields);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result.data,
  });
});

export const AdminController = { getAdmins };
