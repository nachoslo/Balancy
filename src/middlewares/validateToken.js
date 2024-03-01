//Los middlewares son funciones que se van a ejecutar antes de que lleguen a una ruta
//EJ: Si el user esta logueado puede entrar a la URL /profile, sino no
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  //cuando enviamos el login el cookie con el token se guarda en el Header y lo llamamos con req.headers.cookie o req.cookies
  const { token } = req.cookies;
  console.log(token)

  //cuando damos logout recordemos que vaciamos el token
  if (!token)
    return res.status(401).json({ message: "No token, authorizaton denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    //todas las funciones register, login, logout tienen un objeto req como parametro y si guardamos los datos en req.user van a poder acceder a los datos que tenemos guardados en esa variable
    req.user = user;
    next();
  });
};
