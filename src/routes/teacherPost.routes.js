import { Router } from "express";
import {
  addTeacherPost,
  getPostsByLocation,
  getTeacherPosts,
} from "../controller/teacherPost.controller.js";

const router = Router();

router.route("/").post(addTeacherPost);
router.route("/").get(getTeacherPosts);
router.route("/location").get(getPostsByLocation);

export default router;
