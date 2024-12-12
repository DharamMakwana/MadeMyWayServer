import { StatusCodes } from "http-status-codes"
import { APIError } from "../errors/apiError"
import { OtpModel } from "../models/otp.model"
import { IOTP } from "../types/model.types"
import { Types } from "mongoose"

export const generateOtp = async (): Promise<IOTP> => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
    const otpRecord = await OtpModel.create({
      otp,
    })

    return otpRecord.toObject()
  } catch (error) {}
}

export const verifyOtp = async (
  id: Types.ObjectId,
  otp: string
): Promise<boolean> => {
  const otpRecord = await OtpModel.findOne({ _id: id, otp })

  if (!otpRecord) {
    throw new APIError(StatusCodes.BAD_REQUEST, "Invalid OTP.")
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new APIError(StatusCodes.BAD_REQUEST, "OTP has expired.")
  }

  return true
}
