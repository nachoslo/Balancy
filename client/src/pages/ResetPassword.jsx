import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function ResetPassword() {
  const {
    resetPassword,
    errors: ResetPasswordErrors,
    setErrors,
    loader,
  } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    if (values.password === values.confirmPassword) {
      document.getElementById("reset-btn").classList.add("animate-pulse");

      const res = await resetPassword(values.password, params.token);

      document.getElementById("reset-btn").classList.remove("animate-pulse");

      if (res.status === 200) {
        let text = document.getElementById("reset-pwd-text");

        text.textContent =
          "Contraseña actualizada. Te redireccionaremos al inicio de sesión :)";
        text.classList.add("text-emerald-400");
        setErrors([]);
        navigate("/login");
      }
    }
    setErrors(["Contraseña diferente"]);
    document.getElementById("reset-btn").classList.remove("animate-pulse");
  });

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full min-h-svh flex flex-col justify-center items-center gap-4 sm:gap-8">
          <Link to="/" className="flex justify-center items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="w-6 h-6 fill-pink-700 sm:w-8 sm:h-8"
            >
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
            </svg>
            <h1 className="text-3xl text-white font-bold sm:text-4xl">
              Balancy
            </h1>
          </Link>
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-4 p-8 bg-neutral-700/30 rounded-md shadow-md sm:w-2/3 lg:w-1/2"
          >
            <div>
              <h2 id="reset-pwd-text" className="text-lg font-bold">
                Restablecer contraseña
              </h2>
              {ResetPasswordErrors.includes("diferente") ? (
                <p className="text-rose-700 text-xs">
                  Las contraseñas no coinciden
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                placeholder="Nueva contraseña"
              />
              {errors.password ? (
                <p className="text-rose-700 text-xs">Contraseña es requerida</p>
              ) : (
                ResetPasswordErrors.map((error, i) =>
                  error.includes("Contraseña") ? (
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
                {...register("confirmPassword", { required: true })}
                className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                placeholder="Confirmar contraseña"
              />
              {errors.confirmPassword ? (
                <p className="text-rose-700 text-xs">Contraseña es requerida</p>
              ) : (
                ResetPasswordErrors.map((error, i) =>
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
              id="reset-btn"
              className="py-2 bg-pink-700 rounded-md hover:bg-pink-600"
            >
              Cambiar contraseña
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
