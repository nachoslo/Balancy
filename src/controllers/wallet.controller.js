import Wallet from "../models/wallet.model.js";

export const getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({
      //va a traer todas las tareas en la que su propiedad user sea el ID del user
      user: req.user.id,
    }).populate("user");

    if (wallets.length === 0)
      return res.status(404).json(["Wallets not found"]);

    res.json(wallets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) return res.status(404).json(["Wallet not found"]);

    res.json(wallet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createWallet = async (req, res) => {
  try {
    const { wallet, cuil, alias, tag, cbu, balance, date } = req.body;

    const wallets = await Wallet.find({ user: req.user.id, wallet });

    if (wallets.length > 0)
      return res.status(401).json(["Ya tienes una wallet asociada"]);

    const newWallet = new Wallet({
      wallet,
      cuil,
      alias,
      tag,
      cbu,
      balance,
      date,
      user: req.user.id,
    });

    const savedWallet = await newWallet.save();
    res.json(savedWallet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateWallet = async (req, res) => {
  try {
    const body = req.body;
    body.date = Date.now();

    const wallet = await Wallet.findByIdAndUpdate(
      req.params.id,
      body /* , {
    new: true, //que nos devuelva el dato nuevo, no el de antes de actualizar
  } */
    );

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.json(wallet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndDelete(req.params.id);

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.sendStatus(204); //todo salio ok pero no voy a devolver nada
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
