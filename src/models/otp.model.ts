import { Schema, model } from "mongoose"
import { IOTP } from "../types/model.types"

const otpSchema = new Schema<IOTP>(
  {
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  },
  { timestamps: true }
)

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const OtpModel = model<IOTP>("Otp", otpSchema)
