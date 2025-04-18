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
    message:
      result.data?.length > 0
        ? "Admins retrieved successfully"
        : "No Admin found",
    meta: result.meta,
    data: result.data,
  });
});

const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmin(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message:
      result !== null
        ? "Admin retrieved successfully"
        : "No Admin found with this id",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

export const AdminController = { getAdmins, getAdmin, updateAdmin };
