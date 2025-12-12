import { Router } from "express";
import { createPost, updatePost, deletePost, getPost, getPosts } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public Routes
router.route("/").get(getPosts);
router.route("/:slug").get(getPost);

// Protected Routes (User must be logged in)
router.route("/").post(
    verifyJWT, 
    upload.single("featuredImage"), // Middleware to handle file upload
    createPost
);
router.route("/:slug").patch(verifyJWT, upload.single("featuredImage"), updatePost);
router.route("/:slug").delete(verifyJWT, deletePost);

export default router;
