import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet,
} from "../controllers/wallet.controller.js";
import { walletSchema } from "../schemas/wallet.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/wallets", authRequired, getWallets);
router.get("/wallets/:id", authRequired, getWallet);
router.post(
  "/wallets",
  authRequired,
  validateSchema(walletSchema),
  createWallet
);
router.put(
  "/wallets/:id",
  authRequired,
  validateSchema(walletSchema),
  updateWallet
);
router.delete("/wallets/:id", authRequired, deleteWallet);

export default router;
