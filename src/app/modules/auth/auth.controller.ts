import status from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

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

export const AuthController = {
  loginUser,
};
