import { Router } from "express";
import { UserController } from "./user.controller";
import { adminValidation } from "../admin/admin.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-admin",
  validateRequest(adminValidation.createAdminValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
