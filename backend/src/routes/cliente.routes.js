import { Router } from "express";
import { getAllClientes } from "../controllers/cliente.controller.js";

const router = Router();

router.get("/",getAllClientes);

export default router;