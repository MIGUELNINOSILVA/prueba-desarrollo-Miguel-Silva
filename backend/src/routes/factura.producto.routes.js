import { Router } from "express";
import { buyProducts, deleteProducts, getAllFacturaProductos, getFacturaByIdFactura } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);
router.get("/detalle",getFacturaByIdFactura);
router.post("/", buyProducts);
router.delete("/", deleteProducts);

export default router;