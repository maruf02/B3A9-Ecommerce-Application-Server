import express from "express";
import { LoginActivityController } from "./loginActivity.controller";
const router = express.Router();

router.post("/loginActivity", LoginActivityController.createLoginActivity);
router.get("/loginActivities", LoginActivityController.getAllLoginActivities);

export const loginActivityRoutes = router;
