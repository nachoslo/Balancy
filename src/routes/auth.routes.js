import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyToken,
  forgotPassword,
  resetPassword,
  verifyResetPassword,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateResetPassword } from "../middlewares/validateResetPassword.js";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/login/forgot-password", forgotPassword);
router.get("/verify-reset-password/:token", verifyResetPassword);
router.post(
  "/login/forgot-password/:token",
  validateSchema(resetPasswordSchema),
  validateResetPassword,
  resetPassword
);
router.post("/logout", logout);
router.get("/verify", verifyToken);

export default router;
