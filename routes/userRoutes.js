import express from "express";
import userRegister from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", userRegister);

export default router;
