import { useEffect, useLayoutEffect, useState } from "react";
import { useWallets } from "../context/WalletContext";
import WalletCard from "../components/WalletCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function WalletsPages() {
  const {
    getWallets,
    wallets,
    loader,
    setLoader,
    confirmDelete,
    deleteWallet,
    setConfirmDelete,
  } = useWallets();
  const [currencies, setCurrencies] = useState([]);

  let balanceTotal = 0;
  wallets.map((wallet) => (balanceTotal += parseFloat(wallet.balance)));

  useEffect(() => {
    getWallets();

    const fetchData = async () => {
      const dolarValues = await fetch("https://dolarapi.com/v1/dolares").then(
        (response) => response.json()
      );

      const euroValues = await fetch(
        "https://dolarapi.com/v1/cotizaciones/eur"
      ).then((response) => response.json());

      dolarValues.push(euroValues);
      setCurrencies(dolarValues);
      setLoader(false);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="w-full min-h-screen pt-20 flex flex-col items-center gap-8 md:gap-10 md:pt-24">
            <div className="w-full flex flex-col gap-4">
              <div className="text-sm text-center p-6 bg-neutral-700/30 border-neutral-700 border rounded-2xl shadow-md md:text-base">
                Balancy esta en su version BETA. Por el momento la creacion de
                wallets en Safari se encuentra deshabilitada.
              </div>
              <div className="w-full flex gap-2 overflow-hidden md:gap-12">
                <div className="flex gap-2 animate-slideMobile md:gap-12 md:animate-slide">
                  {currencies.map((value, i) =>
                    ["blue", "tarjeta", "cripto", "oficial"].includes(
                      value.casa
                    ) ? (
                      <div
                        key={i}
                        className="w-40 h-16 py-2 px-4 flex flex-col justify-around items-center bg-neutral-700/30 rounded-lg md:w-[270px] md:h-20"
                      >
                        <p className={`${value.casa}`}>
                          {value.moneda} {value.casa}
                        </p>{" "}
                        ${value.venta}
                      </div>
                    ) : null
                  )}
                </div>
                <div className="flex gap-2 animate-slideMobile md:gap-12 md:animate-slide">
                  {currencies.map((value, i) =>
                    ["blue", "tarjeta", "cripto", "oficial"].includes(
                      value.casa
                    ) ? (
                      <div
                        key={i}
                        className="w-40 h-16 py-2 px-4 flex flex-col justify-around items-center bg-neutral-700/30 rounded-lg md:w-[270px] md:h-20"
                      >
                        <p className={`${value.casa}`}>
                          {value.moneda} {value.casa}
                        </p>{" "}
                        ${value.venta}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-grow flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold md:text-4xl">Wallets</h2>
                  <p className="h-[17px] text-sm md:text-base md:h-[21px]">
                    Balance Total:{" "}
                    <span className="text-pink-600 text-base font-bold md:text-lg">
                      ${parseFloat(balanceTotal).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Link
                    to="/wallets/new"
                    className="text-nowrap text-sm p-2 pr-4 flex justify-center items-center gap-1 bg-pink-700 rounded-md hover:bg-pink-600 md:w-34 md:text-base"
                  >
                    <svg
                      className="fill-neutral-200"
                      width="20"
                      height="20"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    Nueva wallet
                  </Link>
                </div>
              </div>
              {wallets.length === 0 ? (
                <div className="flex flex-grow justify-center items-center">
                  No hay wallets
                </div>
              ) : (
                <div className="w-full grid grid-cols-walletsGrid gap-4 mb-4">
                  {wallets.map((wallet) => (
                    <WalletCard wallet={wallet} key={wallet._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {confirmDelete.confirm ? (
            <div className="fixed inset-0 w-screen h-screen flex justify-center items-center gap-20 bg-black/50 backdrop-blur-md shadow-md z-50">
              <div className="p-8 flex flex-col gap-4 justify-center items-center bg-neutral-700/30 border-neutral-800 border rounded-2xl shadow-md">
                <p>Deseas eliminar la wallet {confirmDelete.wallet.name}?</p>
                <div className="flex gap-4">
                  <button
                    className="w-24 py-1 bg-pink-700 rounded-md hover:bg-pink-600"
                    onClick={() => {
                      deleteWallet(confirmDelete.wallet.id);
                    }}
                  >
                    Si
                  </button>
                  <button
                    className="w-24 py-1 bg-pink-700 rounded-mdhover:bg-pink-600"
                    onClick={() =>
                      setConfirmDelete({
                        confirm: false,
                        wallet: { name: null, id: null },
                      })
                    }
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default WalletsPages;
