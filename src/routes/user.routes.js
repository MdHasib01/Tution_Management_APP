import { Router } from "express";

import { registerUser, signInUser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(signInUser);

export default router;
