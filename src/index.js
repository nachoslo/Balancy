//arranque de la app, llama a express, llama a la db, encargado de arrancar todo
import app from "./app.js";
import "dotenv/config.js";
import { connectDB } from "./db.js";

connectDB();

app.listen(3000, () => {
  console.log(`Server on http://localhost:${process.env.PORT}`);
});
