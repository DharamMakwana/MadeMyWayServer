import express from "express"
import { adminAuthController } from "../controllers/auth.controller"
const authRouter = express.Router()

authRouter.post("/admin", adminAuthController)

export { authRouter }
