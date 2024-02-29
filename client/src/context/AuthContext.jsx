import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import { useWallets } from "./WalletContext";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadingA, setLoadingA] = useState(true);
  const [loader, setLoader] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { setWallets } = useWallets();

  const signUp = async (data) => {
    try {
      await registerRequest(data);
      setIsRegister(true);
      setErrors([]);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signIn = async (data) => {
    try {
      const res = await loginRequest(data);
      setErrors([]);
      setUser(res.data);
      setIsAuthenticated(true);
      setIsRegister(false);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setIsRegister(false);
    setWallets([]);
    setConfirmLogout(false);
  };

  const forgotPassword = async (data) => {
    try {
      const res = await forgotPasswordRequest(data);
      return res;
    } catch (error) {
      setErrors(error.response.data);
      return error.response;
    }
  };

  const resetPassword = async (data, token) => {
    try {
      const res = await resetPasswordRequest({ password: data }, token);
      setErrors([]);
      return res;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    //como se ejecuta cuando cambia errors, cuando aparezca un error, luego de 5 segundos se vacia el state por lo tanto desaparece el error
    if (errors.length > 0) {
      //es buena practica para el render en react
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoadingA(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoadingA(false);
          return;
        }
        setLoadingA(false);
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoadingA(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        loadingA,
        user,
        isRegister,
        setIsRegister,
        isAuthenticated,
        errors,
        setErrors,
        logout,
        setConfirmLogout,
        confirmLogout,
        forgotPassword,
        resetPassword,
        loader,
        setLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
