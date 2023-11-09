import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.USR}:${process.env.PWD}@clusterkariomedia.m64rz9h.mongodb.net/${process.env.DB_NAME}`)
.then(db => console.log("Db connected"))
.catch(error => handleError(error));
