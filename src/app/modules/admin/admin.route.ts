import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getAdmin);
router.patch("/:id", AdminController.updateAdmin);

export const AdminRoutes = router;
