import { Router } from "express";
import {
  addAPost,
  deletePost,
  getPosts,
} from "../controller/post.controller.js";

const router = Router();

router.route("/post_request").post(addAPost);
router.route("/").get(getPosts);
router.route("/:id").delete(deletePost);

export default router;
