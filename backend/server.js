import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRouter.js"


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// Api endpoints
app.use("/api/user", userRouter)
app.get("/", (req, res) => {
    res.send("Api Working")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})