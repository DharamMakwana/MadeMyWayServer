import { Types } from "mongoose"

export interface IUser {
  _id?: Types.ObjectId
  name?: string
  phoneNumber?: string
  firebaseUserId?: string
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IOTP {
  _id?: Types.ObjectId
  otp: string
  expiresAt: Date
  verified: boolean
}
