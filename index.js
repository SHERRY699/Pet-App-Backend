import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Db from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

//db
Db();
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000", // Adjust this to match your frontend's port
    credentials: true, // Allow credentials to be sent
  })
);

//routes
app.use("/user", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server Started at ", port);
});