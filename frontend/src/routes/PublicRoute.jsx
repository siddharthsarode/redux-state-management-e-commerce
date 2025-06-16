import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default PublicRoute;
