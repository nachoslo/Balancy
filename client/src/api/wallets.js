import axios from "./axios";

export const getWalletsRequest = () => axios.get("/wallets");

export const getWalletRequest = (id) => axios.get(`/wallets/${id}`);

export const createWalletRequest = (wallet) => axios.post("/wallets", wallet);

export const updateWalletRequest = (id, wallet) =>
  axios.put(`/wallets/${id}`, wallet);

export const deleteWalletRequest = (id) => axios.delete(`/wallets/${id}`);
