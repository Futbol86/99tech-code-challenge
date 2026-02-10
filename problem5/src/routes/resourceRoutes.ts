import express from "express";
import { createResource, updateResource, deleteResource, listResources, getResourceById } from "../controllers/resourceController.ts";
import { validateAccountCreation, validateAccountUpdate } from "../middleware/validate.ts";

const router = express.Router();

router.post("/resources", validateAccountCreation, createResource);
router.put("/resources/:id", validateAccountUpdate, updateResource);
router.delete("/resources/:id", deleteResource);
router.get("/resources", listResources);
router.get("/resources/:id", getResourceById);

export default router;