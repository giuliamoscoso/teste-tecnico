import { Router } from "express";

import { LoginController } from "./modules/Login/LoginController";

const router = Router();

const loginController = new LoginController();

router.post("/login", loginController.handle);

export default router;
