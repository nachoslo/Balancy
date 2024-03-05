import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader";

function LoginPage() {
  const { signIn, errors: LoginErrors, isAuthenticated, loadingA } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    document.getElementById("login-btn").classList.add("animate-pulse");
    await signIn(values);
    document.getElementById("login-btn").classList.remove("animate-pulse");
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/wallets");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated && loadingA)
    return (
      <div className="login-container">
        <Loader />
      </div>
    );

  if (!loadingA && !isAuthenticated)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4 sm:gap-8">
        <div className="text-xs text-neutral-600 text-center flex flex-col md:text-sm ">
          <span>Acesso rápido:</span>
          <span>EMAIL - test@test.com</span>
          <span>CONTRASEÑA - test123</span>
        </div>
        <Link to="/" className="flex justify-center items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            className="w-6 h-6 fill-pink-700 sm:w-8 sm:h-8"
          >
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
          </svg>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Balancy</h1>
        </Link>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-4 p-8 bg-neutral-700/30 rounded-md shadow-md sm:w-2/3 lg:w-1/2"
        >
          <h2 className="text-lg font-bold">Iniciar sesión</h2>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="EMAIL"
            />
            {errors.email ? (
              <p className="text-rose-700 text-xs">Email es requerido</p>
            ) : (
              LoginErrors.map((error, i) =>
                !error.includes("Contraseña") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="CONTRASEÑA"
            />
            {errors.password ? (
              <p className="text-rose-700 text-xs">Contraseña es requerida</p>
            ) : (
              LoginErrors.map((error, i) =>
                error.includes("Contraseña") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
          <button
            type="submit"
            id="login-btn"
            className="py-2 bg-pink-700 rounded-md hover:bg-pink-600"
          >
            Iniciar sesión
          </button>
          <Link
            to="/login/forgot-password"
            className="text-sm text-pink-700 hover:text-pink-600 sm:text-base"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </form>
        <p className="text-sm flex justify-center gap-2 sm:text-base">
          No tienes una cuenta?
          <Link to="/register" className="text-pink-700 hover:text-pink-600">
            Regístrate
          </Link>
        </p>
      </div>
    );
}

export default LoginPage;
