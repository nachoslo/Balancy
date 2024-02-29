import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, logout, user, confirmLogout, setConfirmLogout } =
    useAuth();
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <nav className="fixed bg-neutral-950 shadow-md inset-0 w-full h-16 px-4 flex justify-between items-center z-40 md:h-20 md:px-32 2xl:px-96">
        <Link
          to={isAuthenticated ? "/wallets" : "/"}
          className="flex justify-center items-center gap-2"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-6 h-6 fill-pink-700 md:w-8 md:h-8"
          >
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
          </svg>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Balancy</h1>
        </Link>
        <div className="text-sm flex justify-center items-center md:text-base">
          {isAuthenticated ? (
            /* NAV DESKTOP */
            <ul
              className={
                mobile
                  ? "fixed top-0 right-0 w-1/2 h-screen flex flex-col justify-center items-center bg-neutral-950/50 backdrop-blur-md border-l border-l-pink-950 sm:w-1/3 md:static md:flex md:flex-row md:gap-4 md:w-auto md:h-auto md:border-none md:backdrop-blur-none md:bg-none xl:gap-8"
                  : "flex justify-center items-center md:gap-4 xl:gap-8"
              }
            >
              <li
                className={
                  mobile
                    ? "text-base text-nowrap font-bold h-6 mb-5 md:h-5 select-none md:mb-0"
                    : "text-base text-nowrap font-bold h-6 md:h-5 select-none"
                }
              >
                Hola{" "}
                <span className="text-pink-600">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </span>
                <svg
                  viewBox="0 -960 960 960"
                  className={
                    mobile
                      ? "hidden"
                      : "inline w-7 h-7 fill-pink-700 cursor-pointer md:hidden ml-2 mb-1"
                  }
                  onClick={() => setMobile(true)}
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </li>
              <li className="w-full">
                <Link
                  to="/profile"
                  className={
                    mobile
                      ? "w-full py-2 flex justify-center items-center gap-1 text-center hover:bg-pink-950 md:mt-1 md:px-4 md:bg-pink-950 md:rounded-2xl md:hover:bg-pink-900"
                      : "hidden justify-center items-center gap-1 text-center mt-1 bg-pink-950 px-4 py-2 rounded-2xl hover:bg-pink-900 md:flex"
                  }
                >
                  <span>Perfil</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="fill-pink-700 w-5 h-5"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setConfirmLogout(true)}
                  className={
                    mobile
                      ? "w-full py-2 flex justify-center items-center gap-1 text-center hover:bg-pink-950 md:mt-1 md:px-4 md:bg-pink-700 md:rounded-2xl md:hover:bg-pink-600"
                      : "hidden justify-center items-center gap-1 text-center mt-1 bg-pink-700 px-4 py-2 rounded-2xl hover:bg-pink-600 md:flex"
                  }
                >
                  <span>Salir</span>
                  <svg
                    viewBox="0 -960 960 960"
                    className={
                      mobile
                        ? "fill-pink-700 w-5 h-5 md:fill-pink-950"
                        : "fill-pink-950 w-5 h-5"
                    }
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                </button>
              </li>
              <svg
                viewBox="0 -960 960 960"
                className={
                  mobile
                    ? "w-8 h-8 fixed top-0 right-0 mr-4 mt-5 fill-pink-700 hover:fill-pink-600 cursor-pointer md:hidden"
                    : "hidden"
                }
                onClick={() => setMobile(false)}
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </ul>
          ) : (
            <ul className="mt-1 flex justify-center items-center gap-2 sm:gap-4">
              <li>
                <a href="#about" className="text-pink-700">
                  Acerca
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-nowrap bg-neutral-700/30 py-2 px-3 rounded-md hover:bg-neutral-700/40 md:py-3 md:px-4"
                >
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      {confirmLogout ? (
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-center gap-20 bg-black/50 backdrop-blur-md shadow-md z-50">
          <div className="p-8 flex flex-col gap-4 justify-center items-center bg-neutral-700/30 border-neutral-800 border rounded-2xl shadow-md">
            <p>¿Deseas salir?</p>
            <div className="flex gap-4">
              <button
                className="w-24 py-1 bg-pink-700 rounded-md hover:bg-pink-600"
                onClick={logout}
              >
                Si
              </button>
              <button
                className="w-24 py-1 bg-pink-700 rounded-md hover:bg-pink-600"
                onClick={() => setConfirmLogout(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
