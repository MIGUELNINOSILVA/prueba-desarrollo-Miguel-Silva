import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

//Routes
import clienteRoute from "./routes/cliente.controller.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Use the routes
app.use("/api/cliente", clienteRoute);


export default app;