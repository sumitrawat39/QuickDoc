import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile,
);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/book-appointment",authUser,bookAppointment)
export default userRouter;
