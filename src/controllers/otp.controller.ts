import { Request, Response } from "express"
import { generateOtp, verifyOtp } from "../services/otp.service"
import { StatusCodes } from "http-status-codes"
import { generateJWT } from "../utility/genJWT"
import { sendEmail } from "../utility/sendMail"

export const generateOtpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const otp = await generateOtp()

  await sendEmail({
    to: "infofordharam@gmail.com",
    html: `  <p>Hi</p>
        <p>Your OTP is ${otp.otp}</p>`,
    subject: "OTP For Admin Panel",
  })

  res
    .status(StatusCodes.OK)
    .json({ message: "OTP generated successfully", id: otp._id })
}

export const verifyOtpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, otp } = req.body

  const isValid = await verifyOtp(id, otp)

  if (isValid) {
    const token = generateJWT({
      role: "ADMIN",
      id: "6759df235abde18ce25c6d22",
    })
    res
      .status(StatusCodes.OK)
      .json({ message: "OTP verified successfully", token })
  }
}
