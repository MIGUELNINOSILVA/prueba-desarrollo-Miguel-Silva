import { Router } from "express";
import { getAllFacturas } from "../controllers/factura.controller.js";

const router = Router();

router.get("/", getAllFacturas);

export default router;
