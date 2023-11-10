import { Router } from "express";
import { buyProducts, deleteProducts, getAllFacturaProductos } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);
router.post("/", buyProducts);
router.delete("/", deleteProducts);

export default router;