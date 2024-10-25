import { Router } from "express";
import { getPosts } from "../controller/post.controller";

const router = Router();

router.route("/").post(addAPost);
router.route("/").get(getPosts);
