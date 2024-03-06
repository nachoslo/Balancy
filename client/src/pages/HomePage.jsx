/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import iphone2 from "../assets/iphone2.png";
import About from "./About";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/wallets");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-around items-center gap-8 pt-16 md:pt-28 overflow-x-hidden">
        <div className="mt-6 flex flex-col justify-center items-center gap-4 md:gap-8">
          <p className="text-xs text-neutral-400 text-center md:text-sm">
            Por el momento Balancy no funciona en Safari
            debido a que el proyecto no se encuentra hosteado en un único
            dominio y los navegadores de Safari por defecto no soportan las third-party
            cookies necesarias para la autenticación.
          </p>
          <h3 className="relative text-xs text-neutral-200 px-6 py-2 bg-neutral-700/30 border-neutral-700 border rounded-2xl shadow-md md:text-sm">
            Versión BETA
          </h3>
          <h2 className="text-3xl text-center md:text-4xl xl:text-5xl">
            La experiencia más simple para administrar tus datos bancarios.
          </h2>
          <Link
            to="/register"
            className="text-nowrap w-fit bg-neutral-700/30 py-2 px-3 rounded-md hover:bg-neutral-700/40 md:py-3 md:px-4"
          >
            Comenzá a organizarte
          </Link>
        </div>
        <img
          src={iphone2}
          alt="balancy-home-img"
          className="min-w-[700px] mb-4 animate-fadeIn md:min-w-fit"
        />
      </div>
      <About />
    </>
  );
}

export default HomePage;
