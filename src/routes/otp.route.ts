import express from "express"
import {
  generateOtpController,
  verifyOtpController,
} from "../controllers/otp.controller"

const otpRouter = express.Router()

otpRouter.get("/", generateOtpController)
otpRouter.post("/", verifyOtpController)

export { otpRouter }
