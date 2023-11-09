import {Schema, model} from "mongoose";

const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  apellido: {
    type: String,
    required: [true, "El apellido es obligatorio"]
  },
  direccion: {
    type: String,
    required: [true, "La dirección es obligatoria"]
  },
  fecha_nacimiento: {
    type: Date,
    required: [true, "La fecha de nacimiento es obligatoria"]
  },
  telefono: {
    type: Number,
    required: [true, "El número de teléfono es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"]
  },
  categoria: {
    type: String,
    required: [true, "La categoría es obligatoria"]
  }
});

export default model("Cliente", clienteSchema);