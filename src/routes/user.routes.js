import { Router } from "express";

import {
  getUsers,
  registerUser,
  signInUser,
  updateUserPaidStatus,
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(signInUser);
router.route("/pay").put(updateUserPaidStatus);
router.route("/").get(getUsers);

export default router;
