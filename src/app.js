//configurar todo el codigo de express, del backend

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import walletsRoutes from "./routes/wallets.routes.js";

const app = express();

const origin = process.env.ORIGIN_CORS || "http://localhost:5173";

app.use(
  cors({
    origin, //ahora solo este puede conectarse
    credentials: true, //para pasarle las cookies tambien
  })
); //permite que todos los dominios se puedan comunicar, le pidan datos
app.use(morgan("dev"));
app.use(express.json()); //para que express convierte los req.body en json
app.use(cookieParser()); //para leer las cookies, convertirlas a json

//todas las rutas de auth.routes y van a empezar con /api
app.use("/api", authRoutes);
app.use("/api", walletsRoutes);

export default app;
