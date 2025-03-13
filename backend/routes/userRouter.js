import express from 'express';
import { getUserData, registerUser, updateProfile, userLogin } from '../controllers/userControllers.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router()

userRouter.post("/register", upload.single("image"), registerUser)
userRouter.post("/login", userLogin)
userRouter.get("/profile", authUser, getUserData)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

export default userRouter;