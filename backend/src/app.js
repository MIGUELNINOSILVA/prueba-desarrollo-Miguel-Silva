import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


export default app;