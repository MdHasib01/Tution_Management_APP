import { Router } from "express";
import { addAPost, getPosts } from "../controller/post.controller.js";

const router = Router();

router.route("/").post(addAPost);
router.route("/").get(getPosts);

export default router;
