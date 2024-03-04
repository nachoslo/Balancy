import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const { forgotPassword, errors: ForgotPasswordErrors } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    document.getElementById("forgot-btn").classList.add("animate-pulse");
    const res = await forgotPassword(values);
    
    if (res.status === 200) {
      let text = document.querySelector(".forgot-password-text")
      
      text.textContent = res.data;
      text.classList.add("text-emerald-400")
      document.getElementById("forgot-btn").classList.remove("animate-pulse");

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
    if (res.status === 401) {
      let text = document.querySelector(".forgot-password-text");

      text.textContent = res.data
      text.classList.add("text-rose-700")
      document.getElementById("forgot-btn").classList.remove("animate-pulse");
    }
    document.getElementById("forgot-btn").classList.remove("animate-pulse");
  });

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 sm:gap-8">
      <Link to="/" className="flex justify-center items-center gap-2">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-pink-700 sm:w-8 sm:h-8"
        >
          <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
        </svg>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Balancy
        </h1>
      </Link>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-8 bg-neutral-700/30 rounded-md shadow"
      >
        <p className="forgot-password-text">
          Ingresa tu correo electrónico para buscar tu cuenta.
        </p>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
          placeholder="Email"
        />
        {errors.email ? (
          <p className="text-rose-700 text-xs">Email es requerido</p>
        ) : (
          ForgotPasswordErrors.map((error, i) =>
            error.includes("Email") ? (
              <p className="text-rose-700 text-xs" key={i}>
                {error}
              </p>
            ) : null
          )
        )}
        <button
          type="submit"
          id="forgot-btn"
          className="w-full py-2 bg-pink-700 rounded-md hover:bg-pink-600"
        >
          Enviar email
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
