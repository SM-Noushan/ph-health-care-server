import status from "http-status";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result.data,
  });
});

export const UserController = { createAdmin };
