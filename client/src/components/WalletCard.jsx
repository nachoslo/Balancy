import { useWallets } from "../context/WalletContext";
import { Link } from "react-router-dom";

function WalletCard({ wallet }) {
  const { setConfirmDelete } = useWallets();
  return (
    <div className="min-w-full h-56 px-6 py-4 flex flex-col justify-between gap-2 rounded-lg bg-neutral-700/30 shadow-md md:main-w-[350px]">
      <header className="flex justify-between items-center">
        <h2 className="text-lg text-nowrap text-pink-700 md:text-xl">
          {wallet.wallet}
        </h2>
        <div className="flex justify-center items-center gap-4">
          <Link to={`/wallets/${wallet._id}`}>
            <svg
              className="w-5 h-5 fill-pink-700 hover:fill-pink-600 md:w-6 md:h-6"
              viewBox="0 -960 960 960"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() =>
              setConfirmDelete({
                confirm: true,
                wallet: { name: wallet.wallet, id: wallet._id },
              })
            }
          >
            <svg
              className="w-5 h-5 fill-pink-700 hover:fill-pink-600 md:w-6 md:h-6"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </header>
      <div>
        <p>
          <span className="text-sm text-neutral-400">CUIL: </span>
          {wallet.cuil}
        </p>
        <p>
          <span className="text-sm text-neutral-400">ALIAS: </span>
          {wallet.alias}
        </p>
        <p>
          {wallet.tag ? (
            <span className="text-sm text-neutral-400">TAG: </span>
          ) : null}
          {wallet.tag}
        </p>
        <p>
          <span className="text-sm text-neutral-400">CVU/CBU: </span>
          {wallet.cbu}
        </p>
        <p className="mt-2 font-bold">
          <span className="text-sm text-neutral-400 font-normal">BALANCE:</span>{" "}
          ${wallet.balance}
        </p>
      </div>
      <p className="text-pink-700/50 text-sm">
        Última actualización: {new Date(wallet.date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default WalletCard;
