import { Request } from "../types/request.types";
import { Response } from "express";
import { db } from "../utility/startServer";
import { StatusCodes } from "http-status-codes";

export const updateSiteStatusController = async (
  req: Request,
  res: Response
) => {
  const { status, id } = req.body;

  const docRef = db.collection("Places").doc(id);

  await docRef.update({
    status: status,
  });

  return res.json(StatusCodes.OK).json({
    message: `Status of document with ID '${id}' updated to ${status}.`,
    success: true,
  });
};

export const deleteSiteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const docRef = db.collection("Places").doc(id);

  await docRef.delete();

  return res.json(StatusCodes.OK).json({
    message: `Document with ID '${id}' has been deleted successfully.`,
    success: true,
  });
};

export const getAllPendingSitesController = async (
  req: Request,
  res: Response
) => {
  const query = db.collection("Places").where("status", "==", false);
  const snapshot = await query.get();

  const places = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res.status(StatusCodes.OK).json({
    message: "All places fetched successfully.",
    data: places,
  });
};

export const getAllSitesController = async (req: Request, res: Response) => {
  const query = db.collection("Places");
  const snapshot = await query.get();

  const places = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res.status(StatusCodes.OK).json({
    message: "All places fetched successfully.",
    data: places,
  });
};
