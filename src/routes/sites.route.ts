import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { validateAdmin } from "../middlewares/validateAdmin";
import {
  deleteSiteController,
  getAllPendingSitesController,
  getAllSitesController,
  updateSiteStatusController,
} from "../controllers/sites.controller";

const sitesRouter = express.Router();

sitesRouter.get("/", validateJWT, validateAdmin, getAllSitesController);
sitesRouter.get(
  "/pending",
  validateJWT,
  validateAdmin,
  getAllPendingSitesController
);
sitesRouter.patch(
  "/status",
  validateJWT,
  validateAdmin,
  updateSiteStatusController
);
sitesRouter.delete("/:id", validateJWT, validateAdmin, deleteSiteController);

export { sitesRouter };
