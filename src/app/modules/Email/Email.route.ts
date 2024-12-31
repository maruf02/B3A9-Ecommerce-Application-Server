import { Router } from "express";
import auth from "../../middlewares/auth";
import { EmailController } from "./Email.controller";

const router = Router();

router.post("/Email", EmailController.createEmail);
router.get("/Email", EmailController.getAllEmails);

export const EmailRoutes = router;
