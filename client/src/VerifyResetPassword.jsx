import { Outlet, useParams, useNavigate } from "react-router-dom";
import { verifyResetPasswordRequest } from "./api/auth";
import { useAuth } from "./context/AuthContext";

function VerifyResetPasswowrd() {
  const { setLoader } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  async function verifyResetPassword() {
    try {
      const res = await verifyResetPasswordRequest(token);
      setLoader(false);
      if (res.status === 200) return;
    } catch (error) {
      navigate("/404");
    }
  }
  verifyResetPassword();
  return <Outlet />;
}

export default VerifyResetPasswowrd;
