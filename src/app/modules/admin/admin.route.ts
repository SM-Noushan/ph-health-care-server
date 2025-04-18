import { Router } from "express";
import { AdminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getAdmin);
router.patch(
  "/:id",
  validateRequest(adminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin
);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
