import { Router } from "express";
import { buyProducts, deleteProducts, getAllFacturaProductos, getFacturaByIdFactura, updateFacturaProductos } from "../controllers/factura.producto.controller.js";

const router = Router();

router.get("/",getAllFacturaProductos);
router.get("/detalle/:id",getFacturaByIdFactura);
router.post("/", buyProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateFacturaProductos);

export default router;