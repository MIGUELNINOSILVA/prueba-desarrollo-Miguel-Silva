import { Router } from "express";
import { getAllFacturas, getClienteFactura } from "../controllers/factura.controller.js";

const router = Router();

router.get("/", getAllFacturas);
router.get("/clientes", getClienteFactura);

export default router;
