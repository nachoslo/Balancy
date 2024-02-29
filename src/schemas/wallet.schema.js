import { z } from "zod";

export const walletSchema = z.object({
  wallet: z.string({
    required_error: "Wallet es requerida", //si no mandan string
  }),
  cuil: z
    .string({
      required_error: "CUIL es requerido",
    })
    .min(10, {
      message: "CUIL inválido",
    })
    .max(11, {
      message: "CUIL inválido",
    })
    .regex(/^\d+$/, "CUIL solo acepta números"),
  alias: z
    .string({
      required_error: "Alias es requerido",
    })
    .max(30, {
      message: "Alias inválido",
    }),
  tag: z
    .string()
    .min(4, {
      message: "Tag inválido",
    })
    .max(30, {
      message: "Tag inválido",
    })
    .startsWith("$", "Tag inválido")
    .or(z.literal("")),
  cbu: z
    .string({
      required_error: "CBU es requerido",
    })
    .length(22, {
      message: "CBU inválido",
    })
    .regex(/^\d+$/, "CBU solo acepta números"),
  balance: z
    .string({
      required_error: "Balance es requerido",
    })
    .regex(/[+-]?([0-9]*[.])?[0-9]+/, "Balance solo acepta números y '.'"),
});
