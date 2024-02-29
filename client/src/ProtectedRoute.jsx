import Loader from "./components/Loader";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loadingA, isAuthenticated } = useAuth();

  if (loadingA) return <Loader />;
  //cada vez que cambiemos de url se vuelve a renderizar la pagina y el state vuelve a false
  if (!loadingA && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />; //el componente que esta adentro (las rutas privadas)
}

export default ProtectedRoute;
