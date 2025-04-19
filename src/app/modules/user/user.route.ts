import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "../../../generated/prisma";
import { adminValidation } from "../admin/admin.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN),
  validateRequest(adminValidation.createAdminValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
