import { Router } from "express";
import { createFactura, deleteFactura, getAllFacturas, getClienteFactura, getFacturaByIdCliente } from "../controllers/factura.controller.js";

const router = Router();

router.get("/", getAllFacturas);
router.get("/clientes", getClienteFactura);
router.get("/clientes/:id", getFacturaByIdCliente);
router.post("/clientes", createFactura);
router.delete("/clientes/:id", deleteFactura);

export default router;
