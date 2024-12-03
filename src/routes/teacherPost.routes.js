import { Router } from "express";
import {
  addTeacherPost,
  deletePost,
  findResponseTure,
  getPostsByLocation,
  getTeacherPosts,
  updateResponse,
} from "../controller/teacherPost.controller.js";

const router = Router();

router.route("/").post(addTeacherPost);
router.route("/").get(getTeacherPosts);
router.route("/location").get(getPostsByLocation);
router.route("/response/:id").put(updateResponse);
router.route("/findReq").get(findResponseTure);
router.route("/:id").delete(deletePost);

export default router;
