import Cliente from "../models/Cliente.js"

export const getAllClientes = async(req, res)=>{
  try {
    const data = await Cliente.find();
    
    if (!data) return res.status(404).json({msg:"Datos no encontrados"});
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(500).json({
      type: error,
      msg: "Error on Server"
    })
  }
}