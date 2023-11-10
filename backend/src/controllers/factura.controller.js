import Factura from "../models/Factura.js";
import Cliente from "../models/Cliente.js";

export const getAllFacturas = async (req, res) => {
  try {
    const data = await Factura.find();
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

export const getClienteFactura = async (req, res) => {
  try {
    const data = await Factura.find().populate({
      path: "id_cliente",
      select: "nombre apellido direccion fecha_nacimiento telefono email id_cliente", 
      model: "Cliente",
    });
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

export const getFacturaByIdCliente = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Cliente.find({ id_cliente: req.params.id }); 
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
