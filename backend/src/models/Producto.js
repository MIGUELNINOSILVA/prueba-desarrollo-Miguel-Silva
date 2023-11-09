import { Schema, model } from "mongoose";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      unique: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio del producto es obligatorio"],
    },
    stock: {
      type: Number,
      required: [
        true,
        "La cantidad del productos de este stock son obligatorios",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Producto", productoSchema);
