import Factura from "../models/Factura.js";

export const getAllFacturas = async (req, res) => {
  try {
    const data = await Factura.find();
    if (!data) return res.status(404).json({msg:"Datos no encontrados"});
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server",
    });
  }
};
