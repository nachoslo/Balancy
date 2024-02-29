import { createContext, useContext, useEffect, useState } from "react";
import {
  getWalletsRequest,
  createWalletRequest,
  getWalletRequest,
  updateWalletRequest,
  deleteWalletRequest,
} from "../api/wallets";

const WalletContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWallets = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallets must be used within a WalletProvider");
  }

  return context;
};

export function WalletProvider({ children }) {
  const [wallets, setWallets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({
    confirm: false,
    wallet: { name: null, id: null },
  });
  const [loadingW, setLoadingW] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getWallets = async () => {
    try {
      const res = await getWalletsRequest();
      setWallets(res.data);
      setErrors([]);
      setLoadingW(false);
    } catch (error) {
      setLoadingW(false);
      setErrors(error.response.data);
    }
  };

  const createWallet = async (wallet) => {
    try {
      const res = await createWalletRequest(wallet);
      setErrors([]);
      return res;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getWallet = async (id) => {
    try {
      const res = await getWalletRequest(id);
      setLoadingW(false);
      setErrors([]);
      return res;
    } catch (error) {
      setErrors(error.response.data);
      return error.response;
    }
  };

  const updateWallet = async (id, values) => {
    try {
      const res = await updateWalletRequest(id, values);
      setErrors([]);
      return res;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const deleteWallet = async (id) => {
    try {
      const res = await deleteWalletRequest(id);
      if (res.status === 204) {
        setWallets(wallets.filter((wallet) => wallet._id !== id));
        setConfirmDelete({
          confirm: false,
          wallet: { name: "", id: "" },
        })
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallets,
        setWallets,
        createWallet,
        getWallets,
        deleteWallet,
        getWallet,
        updateWallet,
        errors,
        confirmDelete,
        setConfirmDelete,
        loadingW,
        setLoadingW,
        loader,
        setLoader,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
