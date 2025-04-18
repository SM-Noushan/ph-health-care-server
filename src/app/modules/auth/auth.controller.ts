import status from "http-status";
import config from "../../config";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, ...data } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "development" ? false : true,
    httpOnly: true,
    // sameSite: "none",
    // maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: data,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await AuthService.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
