import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const authenticated = localStorage.getItem("authenticated");
    return authenticated === "true";
  };

  const requireAuth = () => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  };

  return { isAuthenticated, requireAuth };
};

export default useAuth;
