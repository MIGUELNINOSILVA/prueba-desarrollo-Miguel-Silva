import FacturaProductos from "../models/FacturaProductos.js";
import Factura from "../models/Factura.js";

export const getAllFacturaProductos = async (req, res) => {
  try {
    const data = await FacturaProductos.find().populate(
      {
        path: "id_factura",
        populate: {
          path: "id_cliente",
        }
      }
    ).populate("id_producto");
    if (!data) return res.status(404).json({ msg: "Datos no encontrados" });
    
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server",
    });
  }
};

export const buyProducts = async (req, res) => {
  try {
    const data = await FacturaProductos.find().populate(
      "id_factura id_producto"
    );
    if (!data) return res.status(404).json({ msg: "Datos no encontrados" });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server",
    });
  }
};
