//Validaciones de datos, numero de caracteres, condiciones de email, de dni, etc
import { z } from "zod";

export const registerSchema = z.object({
  //porque req.body es un objeto
  name: z
    .string({
      required_error: "Nombre es requerido", //si no mandan string
    })
    .min(2, "Nombre inválido")
    .max(30, "Nombre inválido")
    .regex(/^[a-zA-Z\s]+$/, "Nombre solo acepta letras"),
  lastName: z
    .string({
      required_error: "Apellido es requerido",
    })
    .min(2, "Apellido inválido")
    .max(30, "Apellido inválido")
    .regex(/^[a-zA-Z\s]+$/, "Apellido solo acepta letras"),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email inválido",
    })
    .max(50, "Email inválido"),
  dni: z
    .string({
      required_error: "DNI es requerido",
    })
    .min(7, {
      message: "DNI debe tener mínimo 7 carácteres",
    })
    .max(8, {
      message: "DNI debe tener máximo 8 carácteres",
    })
    .regex(/^\d+$/, "DNI solo acepta números"),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "Contraseña debe tener mínimo 6 carácteres",
    })
    .max(16, {
      message: "Contraseña debe tener máximo 16 carácteres",
    })
    .regex(
      /^(?!=.*[0-9])(?=.*[a-z])(?!=.*[A-Z])(?!.*\W)(?!.* ).{1,100}$/,
      "Contraseña solo acepta letras y números"
    ),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email inválido",
    }),
  password: z.string({
    required_error: "Contraseña es requerida",
  }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "Contraseña debe tener mínimo 6 carácteres",
    })
    .max(16, {
      message: "Contraseña debe tener máximo 16 carácteres",
    })
    .regex(
      /^(?!=.*[0-9])(?=.*[a-z])(?!=.*[A-Z])(?!.*\W)(?!.* ).{1,100}$/,
      "Contraseña solo acepta letras y números"
    ),
});
