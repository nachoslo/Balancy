/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signUp,
    isRegister,
    errors: RegisterErrors,
    setIsRegister,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isRegister) {
      setIsRegister(false);
      navigate("/login");
    }
  }, [isRegister]);

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 sm:gap-8">
      <Link to="/" className="flex justify-center items-center gap-2">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-pink-700 sm:w-8 sm:h-8"
        >
          <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
        </svg>
        <h1 className="text-3xl text-white font-bold sm:text-4xl">Balancy</h1>
      </Link>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-4 p-8 bg-neutral-700/30 rounded-md shadow-md sm:w-auto"
      >
        <h2 className="text-lg font-bold">Registrarse</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name-registerform"
              className="text-sm text-neutral-400"
            >
              NOMBRE
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="NOMBRE"
              id="name-registerform"
            />
            {errors.name ? (
              <p className="text-rose-700 text-xs">Nombre es requerido</p>
            ) : (
              RegisterErrors.map((error, i) =>
                error.includes("Nombre") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lastName-registerform"
              className="text-sm text-neutral-400"
            >
              APELLIDO
            </label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", { required: true })}
              className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="APELLIDO"
              id="lastName-registerform"
            />
            {errors.lastName ? (
              <p className="text-rose-700 text-xs">Apellido es requerido</p>
            ) : (
              RegisterErrors.map((error, i) =>
                error.includes("Apellido") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full flex flex-col gap-1 md:w-1/3">
            <label
              htmlFor="dni-registerform"
              className="text-sm text-neutral-400"
            >
              DNI
            </label>
            <input
              type="text"
              name="dni"
              {...register("dni", { required: true })}
              className="py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="DNI"
              id="dni-registerform"
            />
            {errors.dni ? (
              <p className="text-rose-700 text-xs">DNI es requerido</p>
            ) : (
              RegisterErrors.map((error, i) =>
                error.includes("DNI") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <label
              htmlFor="email-registerform"
              className="text-sm text-neutral-400"
            >
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
              placeholder="EMAIL"
              id="email-registerform"
            />
            {errors.email ? (
              <p className="text-rose-700 text-xs">Email es requerido</p>
            ) : (
              RegisterErrors.map((error, i) =>
                error.includes("Email") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="pwd-registerform"
            className="text-sm text-neutral-400"
          >
            CONTRASEÑA
          </label>
          <input
            type="password"
            name="password"
            {...register("password", { required: true })}
            className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
            placeholder="CONTRASEÑA"
            id="pwd-registerform"
          />
          {errors.password ? (
            <p className="text-rose-700 text-xs">Contraseña es requerida</p>
          ) : (
            RegisterErrors.map((error, i) =>
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
          className="py-2 bg-pink-700 rounded-md hover:bg-pink-600"
        >
          Registrarse
        </button>
      </form>
      <p className="text-sm flex justify-center gap-2 sm:text-base">
        ¿Ya tienes una cuenta?
        <Link to="/login" className="text-pink-700 hover:text-pink-600">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
