import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  const date = new Date(user.createdAt);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div className="min-h-svh flex flex-col justify-center items-center gap-4">
      <div className="p-4 bg-neutral-700/30 rounded-full shadow">
        <svg
          version="1.1"
          id="Capa_1"
          width="64px"
          height="64px"
          viewBox="0 0 45.532 45.532"
          className="fill-pink-700"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z" />{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center p-8 bg-neutral-700/30 rounded-md shadow-md gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Perfil</h2>
          <Link to="/wallets">
            <svg
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="fill-pink-700 hover:fill-pink-600"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>
        </div>
        <div>
          <p>
            <span className="text-sm text-neutral-400">NOMBRE: </span>
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </p>
          <p>
            <span className="text-sm text-neutral-400">APELLIDO: </span>
            {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </p>
          <p>
            <span className="text-sm text-neutral-400">DNI: </span>
            {user.dni}
          </p>
          <p>
            <span className="text-sm text-neutral-400">EMAIL: </span>
            {user.email}
          </p>
        </div>
        <p className="text-sm text-neutral-400">
          <span className="text-pink-700/50">FECHA DE CREACIÓN: </span>
          {day}/{month + 1}/{year}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
