import { Router } from "express";
import { getAllFacturas, getClienteFactura, getFacturaByIdCliente } from "../controllers/factura.controller.js";

const router = Router();

router.get("/", getAllFacturas);
router.get("/clientes", getClienteFactura);
router.get("/clientes/:id", getFacturaByIdCliente);

export default router;
