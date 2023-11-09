import { Schema, model } from "mongoose";

const facturaSchema = new Schema(
  {
    id_cliente: {
      ref: "Cliente",
      type: Schema.Types.ObjectId,
    },
    num_factura: {
      type: Number,
      required: [true, "El número de la factura es obligatorio"],
      unique: true,
    },
    fecha: {
      type: Date,
      required: [true, "La fecha de la factura es obligatoria"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Factura", facturaSchema);
