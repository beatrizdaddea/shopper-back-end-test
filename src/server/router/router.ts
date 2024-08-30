import express from "express";
import { aiController } from "../controller/aiController";
import { listReadingsController } from "../controller/listReadingsController";
import { confirmReading } from "../controller/patchReadingController";
import { validateRequestBody } from "../middleware/validation";

const router = express.Router();

router.post("/water-gas-reading", validateRequestBody, aiController);
router.get("/water-gas-reading/:customer_code/list", listReadingsController);
router.patch("/water-gas-reading/confirm", confirmReading);

export default router;
