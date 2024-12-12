import express from "express";
import { authRouter } from "./auth.route";
import { sitesRouter } from "./sites.route";
import { otpRouter } from "./otp.route";
import { userRouter } from "./user.route";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/otp", otpRouter);
rootRouter.use("/sites", sitesRouter);

export { rootRouter };
