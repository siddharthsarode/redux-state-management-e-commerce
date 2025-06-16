import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  return children;
};

export default AdminRoute;
