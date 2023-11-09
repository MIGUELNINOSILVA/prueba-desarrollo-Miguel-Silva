import app from "./app.js";
import dotenv from "dotenv";
import "./database.js";
dotenv.config();

app.listen(process.env.PORT ,()=>{
  console.log(`Server is Runing on port ${process.env.PORT}`);
})