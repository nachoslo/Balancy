//es una forma de especificarle a mongodb como van a lucir los datos que estamos guardando

import mongoose from "mongoose";

//que es lo que vamos a guardar
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //quita espacios en blanco
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPassword: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, //fecha y hora de cuando se envio la peticion
  }
);

//crea la coleccion de users para interactuar con la db y los metodos
export default mongoose.model("User", userSchema);
