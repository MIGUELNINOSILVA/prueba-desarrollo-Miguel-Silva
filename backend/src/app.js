import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

//Routes
import clienteRoute from "./routes/cliente.routes.js";
import facturaRoute from "./routes/factura.routes.js";
import productoRoute from "./routes/producto.routes.js";
import facturaProductoRoute from "./routes/factura.producto.routes.js";


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Use the routes
app.use("/api/cliente", clienteRoute);
app.use("/api/factura", facturaRoute);
app.use("/api/producto", productoRoute);
app.use("/api/facturaProducto", facturaProductoRoute);



export default app;