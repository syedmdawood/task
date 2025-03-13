import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary";


const registerUser = async (req, res) => {
    try {
        const { name, email, password, dob, phone, address, gender } = req.body

        if (!name || !email || !password || !dob || !phone || !address || !gender) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.status(404).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(404).json({ success: false, message: "Password must be strong and at least 8 characters" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const userData = {
            name,
            email,
            password: hashedPassword,
            dob,
            phone,
            address,
            gender,
        }
        const newUser = new userModel(userData)
        await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token })
        } else {
            res.status(400).json({ success: false, message: "Invalid Email or Password" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserData = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {

        const { userId, name, dob, phone, address } = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !address) {
            return res.status(400).json({
                success: false,
                message: "data missing"
            });
        }

        await userModel.findByIdAndUpdate(userId, { name, dob, phone, address })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })

            res.json({ success: true, message: "Profile Updated" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { registerUser, userLogin, getUserData, updateProfile }