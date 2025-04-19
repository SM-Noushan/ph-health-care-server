import { Router } from "express";
import auth from "../../middlewares/auth";
import { AdminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";
import { UserRole } from "../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAdmins
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAdmin
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteAdmin
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.softDeleteAdmin
);

export const AdminRoutes = router;
