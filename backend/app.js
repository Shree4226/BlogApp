import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Import Routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

// Declaration of Routes
app.use("/api/v1/users", userRouter); // http://localhost:8000/api/v1/users/register
app.use("/api/v1/posts", postRouter); // http://localhost:8000/api/v1/posts

export { app };
