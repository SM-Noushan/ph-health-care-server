import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getAdmin);
router.patch("/:id", AdminController.updateAdmin);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
