import { Router } from "express";
import { buyProducts, deleteProducts, getAllFacturaProductos, getFacturaByIdFactura } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);
router.get("/detalle/:id",getFacturaByIdFactura);
router.post("/", buyProducts);
router.delete("/:id", deleteProducts);

export default router;