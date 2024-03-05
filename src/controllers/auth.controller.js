import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  //entrada a la información que el cliente envía al servidor a través de formularios, solicitudes AJAX o incluso al interactuar con una API.
  const { name, lastName, dni, email, password } = req.body;

  try {
    const userFound = await User.findOne({ $or: [{ email }, { dni }] });

    if (userFound) {
      if (userFound.email === email) {
        return res.status(400).json(["El email ya esta en uso"]);
      } else if (userFound.dni === dni) {
        return res.status(400).json(["El DNI ya esta en uso"]);
      }
    }

    //encriptar password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      dni,
      email,
      password: passwordHash,
    });

    //lo guarda en la variable y en la db
    const userSaved = await newUser.save();

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //busca en la coleccion User de la db si existe el email que pasamos por req.body y guarda el user
    const userFound = await User.findOne({ email });

    //si no encontro el user retorna el error y si lo encontro matchea las password
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    //si las password no coinciden
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    //si coinciden quiere decir que esta logueado y se crea un token
    const token = await createAccessToken(
      { id: userFound._id },
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, { sameSite: "none", secure: true, httpOnly = true, maxAge = 1000 * 60 * 60 * 24 * 30 });

    res.json({
      name: userFound.name,
      lastName: userFound.lastName,
      dni: userFound.dni,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    //cuando va a hacer un logout el token va a estar vacio y la fecha de expiracion reseteada
    res.cookie("token", "", {
      expires: new Date(0),
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.send(false);

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.sendStatus(401);

      const userFound = await User.findById(user.id);

      if (!userFound) res.status(401);

      //esta res se vanda al /verify, lo comprobe con insomnia
      res.json(userFound);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json(["Email no encontrado"]);

    if (userFound.length === 0)
      return res.status(400).json(["Email no encontrado"]);

    jwt.verify(
      userFound.resetPassword,
      process.env.TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          const token = await createAccessToken(
            { email },
            {
              expiresIn: "15m",
            }
          );

          await User.findOneAndUpdate({ email }, { resetPassword: token });

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "nachobaez.dev@gmail.com",
              pass: "kgep nutw huky yxos",
            },
          });

          const mailOptions = {
            from: "noreply@balancy.com",
            to: email,
            subject: "Reset Account Password Link",
            html: `<h2> Please visit the link below to reset your password </h2>
              <a href="https://balancy.vercel.app/login/forgot-password/${token}">https://balancy.vercel.app/login/forgot-password/${token}<a/>
        `,
          };
          transporter.sendMail(mailOptions, function (error, body) {
            if (error) return res.status(400).json(error);
          });
          return res.json(
            "Email enviado. Te redireccionaremos al inicio de sesión."
          );
        }
        res.status(401).json(["Inténtalo de nuevo más tarde."]);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyResetPassword = (req, res) => {
  try {
    const { token } = req.params;

    if (!token) return res.send(false);

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json(["Token expired"]);

      const userFound = await User.findOne({ resetPassword: token });

      if (!userFound) res.status(401);

      res.json("Autorized");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) return res.status(404);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json(["Token expired"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userFound = await User.findOneAndUpdate(
      { resetPassword: token },
      {
        $set: { resetPassword: "", password: passwordHash },
      }
    );

    if (!userFound) return res.status(401).json(["Token expired"]);

    res.json(["Password updated"]);
  });
};
