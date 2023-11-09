import { Schema, model } from "mongoose";

const facturaSchema = new Schema({
  id_cliente: {
    ref: "Cliente",
    type: Schema.Types.ObjectId
  },
  fecha: {
    type: Date,
    required: [true, "La fecha de la factura es obligatoria"]
  }
});

export default model("Factura", facturaSchema);