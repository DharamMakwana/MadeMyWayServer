import { ClientSession, FilterQuery } from "mongoose";
import { IUser } from "../types/model.types";
import { UserModel } from "../models/user.model";
import { APIError } from "../errors/apiError";
import { StatusCodes } from "http-status-codes";

export const findUser = async ({
  query,
  populate = [],
}: {
  query: FilterQuery<IUser>;
  populate?: string[];
  session?: ClientSession;
}) => {
  try {
    const u = await UserModel.findOne(query, {}).populate(populate).lean();
    return u;
  } catch (error) {
    console.log("Error while finding user", error);
    throw new APIError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

type UpdateOperators<T> = {
  $set?: Partial<T>;
  $inc?: Partial<Record<keyof T, number>>;
  $push?: Partial<Record<keyof T, any>>;
  $pull?: Partial<Record<keyof T, any>>;
  $unset?: Partial<Record<keyof T, any>>;
};

export const updateUser = async ({
  query,
  update,
}: {
  query: FilterQuery<IUser>;
  update: Partial<IUser> & UpdateOperators<IUser>;
}) => {
  try {
    const u = await UserModel.findOneAndUpdate(query, update, {
      new: true,
    });

    return u;
  } catch (error) {
    console.log("Error while updating user", error);
    throw new APIError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const createUser = async (user: IUser) => {
  try {
    const u = await UserModel.create(user);
    return u;
  } catch (error) {
    console.log("Error while creating user", error);
    throw new APIError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

import admin from "firebase-admin";
export const listAllUsers = async () => {
  try {
    const users = [];
    const listUsersResult = await admin.auth().listUsers(1000);

    listUsersResult.users.forEach((userRecord) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        phoneNumber: userRecord.phoneNumber,
        photoURL: userRecord.photoURL,
        providerData: userRecord.providerData,
      });
    });

    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
};
