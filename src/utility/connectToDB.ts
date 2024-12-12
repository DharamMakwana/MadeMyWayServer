import admin from "firebase-admin"
import mongoose from "mongoose"
import { UserModel } from "../models/user.model"

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ansh0713:ansh0713@r-ops.tvslxhg.mongodb.net/mademyway"
    )
    console.log("-- MongoDB Connected --")

    UserModel.create()

    return admin.firestore()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
