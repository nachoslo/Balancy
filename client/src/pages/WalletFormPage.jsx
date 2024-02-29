import { useForm } from "react-hook-form";
import { useWallets } from "../context/WalletContext";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader";

function WalletFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    createWallet,
    getWallet,
    updateWallet,
    errors: WalletsErrors,
    loadingW,
    setLoadingW,
  } = useWallets();

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    async function loadWallet() {
      if (location.pathname === "/wallets/new") {
        document.querySelector(".form-title").textContent = "Nueva wallet";
        return setLoadingW(false);
      }

      if (params.id) {
        //si existe params.id es porque estamos editando una wallet
        const res = await getWallet(params.id);
        if (res.status !== 200) navigate("/404");

        document.querySelector("select").disabled = true;
        setValue("wallet", res.data.wallet);
        setValue("cuil", res.data.cuil);
        setValue("alias", res.data.alias);
        setValue("tag", res.data.tag);
        setValue("cbu", res.data.cbu);
        setValue("balance", res.data.balance);
      }
    }
    loadWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const res = await updateWallet(params.id, data);
      if (res.status === 200) navigate("/wallets");
    } else {
      const res = await createWallet(data);
      if (res.status === 200) navigate("/wallets");
    }
  });

  return (
    <>
      {loadingW ? (
        <Loader />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 p-8 bg-neutral-700/30 rounded-md shadow-md"
          >
            <div className="flex justify-between">
              <h2 className="form-title text-lg font-bold">Editar wallet</h2>
              <Link to="/wallets" className="w-fit">
                <svg
                  className="fill-pink-700 hover:fill-pink-600"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm text-neutral-400"
                htmlFor="wallet-walletform"
              >
                WALLET
              </label>
              <select
                {...register("wallet")}
                className="w-full py-2 px-4 bg-black/25 rounded-md outline-none focus:outline-1 focus:outline-pink-700"
                id="wallet-walletform"
              >
                <option value="Mercado Pago" className="bg-neutral-800">
                  Mercado Pago
                </option>
                <option value="Cuenta DNI" className="bg-neutral-800">
                  Cuenta DNI
                </option>
                <option value="Belo" className="bg-neutral-800">
                  Belo
                </option>
                <option value="Lemon Cash" className="bg-neutral-800">
                  Lemon Cash
                </option>
              </select>
              {WalletsErrors.map((error, i) =>
                error.includes("wallet") ? (
                  <p className="text-rose-700 text-xs" key={i}>
                    {error}
                  </p>
                ) : null
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm text-neutral-400"
                  htmlFor="cuil-walletform"
                >
                  CUIL
                </label>
                <input
                  type="text"
                  placeholder="CUIL"
                  {...register("cuil", { required: true })}
                  className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                  id="cuil-walletform"
                />
                {errors.cuil ? (
                  <p className="text-rose-700 text-xs ">CUIL es requerido</p>
                ) : (
                  WalletsErrors.map((error, i) =>
                    error.includes("CUIL") ? (
                      <p className="text-rose-700 text-xs " key={i}>
                        {error}
                      </p>
                    ) : null
                  )
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm text-neutral-400"
                  htmlFor="alias-walletform"
                >
                  ALIAS
                </label>
                <input
                  type="text"
                  placeholder="ALIAS"
                  {...register("alias", { required: true })}
                  className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                  id="alias-walletform"
                />
                {errors.alias ? (
                  <p className="text-rose-700 text-xs mt-1 ml-1">
                    Alias es requerido
                  </p>
                ) : (
                  WalletsErrors.map((error, i) =>
                    error.includes("Alias") ? (
                      <p className="text-rose-700 text-xs mt-1 ml-1" key={i}>
                        {error}
                      </p>
                    ) : null
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm text-neutral-400"
                  htmlFor="tag-walletform"
                >
                  TAG
                </label>
                <input
                  type="text"
                  placeholder="TAG (opcional)"
                  {...register("tag")}
                  className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                  id="tag-walletform"
                />
                {WalletsErrors[0] === "Tag inválido" ? (
                  <p className="text-rose-700 text-xs mt-1 ml-1">
                    Tag inválido
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm text-neutral-400"
                  htmlFor="cbu-walletform"
                >
                  CBU/CVU
                </label>
                <input
                  type="text"
                  placeholder="CBU/CVU"
                  {...register("cbu", { required: true })}
                  className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                  id="cbu-walletform"
                />
                {errors.cbu ? (
                  <p className="text-rose-700 text-xs mt-1 ml-1">
                    CBU es requerido
                  </p>
                ) : (
                  WalletsErrors.map((error, i) =>
                    error.includes("CBU") ? (
                      <p className="text-rose-700 text-xs mt-1 ml-1" key={i}>
                        {error}
                      </p>
                    ) : null
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm text-neutral-400"
                htmlFor="balance-walletform"
              >
                BALANCE
              </label>
              <input
                type="text"
                placeholder="BALANCE"
                {...register("balance", { required: true })}
                className="w-full py-2 px-4 bg-black/25 rounded-md placeholder:text-sm placeholder:text-neutral-500 outline-none focus:outline-1 focus:outline-pink-700"
                id="balance-walletform"
              />
              {errors.balance ? (
                <p className="text-rose-700 text-xs ">Balance es requerido</p>
              ) : (
                WalletsErrors.map((error, i) =>
                  error.includes("Balance") ? (
                    <p className="text-rose-700 text-xs " key={i}>
                      {error}
                    </p>
                  ) : null
                )
              )}
            </div>
            <button className="py-2 bg-pink-700 rounded-md hover:bg-pink-600">
              Guardar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default WalletFormPage;
