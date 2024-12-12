import { Schema, model } from "mongoose"
import { IUser } from "../types/model.types"

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    firebaseUserId: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
)

export const UserModel = model<IUser>("user", userSchema)
