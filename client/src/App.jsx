import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import WalletsPages from "./pages/WalletsPage";
import HomePage from "./pages/HomePage";
import WalletFormPage from "./pages/WalletFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { WalletProvider } from "./context/WalletContext";
import "./index.css";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyResetPasswowrd from "./verifyResetPassword";

function App() {
  return (
    <WalletProvider>
      <AuthProvider>
        <BrowserRouter>
          <main className="text-neutral-200 w-full min-h-screen px-4 bg-hero-pattern md:px-32 2xl:px-96">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/login/forgot-password"
                element={<ForgotPassword />}
              />
              <Route element={<VerifyResetPasswowrd />}>
                <Route
                  path="/login/forgot-password/:token"
                  element={<ResetPassword />}
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wallets" element={<WalletsPages />} />
                <Route path="/wallets/new" element={<WalletFormPage />} />
                <Route path="/wallets/:id" element={<WalletFormPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </WalletProvider>
  );
}

export default App;
