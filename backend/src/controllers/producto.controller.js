import Producto from "../models/Producto.js";

export const getAllProductos = async (req, res) => {
  try {
    const data = await Producto.find();
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
