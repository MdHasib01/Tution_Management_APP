import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conntectDB from "./db/dbConnect.js";

dotenv.config({
  path: "./.env",
});

const app = new express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

conntectDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed! ${error.message}`);
    process.exit(1);
  });

import userRoutes from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/user", postRouter);
