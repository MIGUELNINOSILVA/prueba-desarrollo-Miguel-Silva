import {Schema, model} from "mongoose";

const facturaProductosSchema = new Schema({
  id_factura: [
    {
      ref: "Factura",
      type: Schema.Types.ObjectId
    }
  ],
  id_producto: [
    {
      ref: "Producto",
      type: Schema.Types.ObjectId
    }
  ]
});

export default model("Factura_productos", facturaProductosSchema);