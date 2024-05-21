import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLoginUser } from "../features/useinfo/userInfoSlice";

function RequireAuth({ children }) {

  const user = useSelector(selectLoginUser);
  console.log(user);
  const location = useLocation();


  if (!user) {
    return <Navigate to="/loading" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;