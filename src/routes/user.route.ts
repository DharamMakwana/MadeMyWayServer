import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { validateAdmin } from "../middlewares/validateAdmin";

import { listAllUsers } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

const userRouter = express.Router();

userRouter.get("/", validateJWT, validateAdmin, async (req, res) => {
  try {
    const users = await listAllUsers();

    return res.status(StatusCodes.OK).json({
      message: "All users fetched successfully.",
      data: users,
    });
  } catch (error) {
    console.log("Error while fetching users", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
});

export { userRouter };
