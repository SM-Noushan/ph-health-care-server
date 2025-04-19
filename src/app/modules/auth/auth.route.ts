import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { UserRole } from "../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthController.forgotPassword
);

export const AuthRoutes = router;
