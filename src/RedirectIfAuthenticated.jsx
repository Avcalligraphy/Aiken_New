import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  // Jika pengguna sudah login, redirect ke home
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  // Jika belum login, tampilkan halaman login
  return children;
};

export default RedirectIfAuthenticated;
