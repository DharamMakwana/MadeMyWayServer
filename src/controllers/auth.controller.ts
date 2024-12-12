import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import { Request as AuthRequest } from "../types/request.types"
import { comparePassword } from "../utility/hashPassword"
import { findUser } from "../services/user.service"

export const logoutController = async (req: AuthRequest, res: Response) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "User logged out successfully",
      success: true,
    })
  } catch (error) {
    console.log("error in logout", error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something happened wrong try again after sometime.",
    })
  }
}

export const adminAuthController = async (req: Request, res: Response) => {
  const { username: email, password } = req.body

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Username and password are required",
    })
  }

  const admin_user = await findUser({ query: { role: "ADMIN" } })

  if (!admin_user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Admin user not found",
    })
  }

  if (admin_user.email !== email) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid email",
    })
  }

  //@ts-ignore
  if (!comparePassword(password, admin_user.password)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid password",
    })
  }

  return res.status(StatusCodes.OK).json({
    message: "Admin logged in successfully",
    success: true,
  })
}
