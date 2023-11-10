import FacturaProductos from "../models/FacturaProductos.js";
import Factura from "../models/Factura.js";

export const getAllFacturaProductos = async (req, res) => {
  try {
    const data = await FacturaProductos.find()
      .populate({
        path: "id_factura",
        populate: {
          path: "id_cliente",
        },
      })
      .populate("id_producto");
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
    const { id_factura, id_producto } = req.body;
    console.log(id_factura, id_producto);
    const data = await FacturaProductos.create(req.body);
    if (!data) return res.status(404).json({ msg: "Datos no encontrados" });
    res.status(201).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server",
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await FacturaProductos.findByIdAndDelete({_id: id});
    if (!data) return res.status(404).json({ msg: "Datos no encontrados" });
    res.status(200).json({
      data,
    })
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server",
    });
  }
};
