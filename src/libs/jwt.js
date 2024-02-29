//Codigo que podemos incluir varias veces
//el JSON Web Token es una forma de pedir desde el front permisos para hacer algo y se le debe devolver un token a modo de pase
import jwt from "jsonwebtoken";

export function createAccessToken(payload, time) {
  return new Promise((resolve, reject) => {
    //al ser promesa podemos usar el async await en auth.controller
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET, //clave secreta utilizada para firmar el token y que solo el servidor conoce
      time,
      (err, token) => {
        if (err) reject; //si salio mal
        resolve(token); //si salio bien devuelve el token que trae encriptado el payload que le enviamos y lo podemos ver en jwt.io
      }
    );
  });
}
