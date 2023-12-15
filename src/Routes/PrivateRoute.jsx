// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { alreadyLoggedIn } from "../redux/action";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  // const token = useSelector((store) => {
  //   return store.token;
  // });
  const dispatch = useDispatch();
  const token = localStorage.getItem("musicmixtoken");
  if (token) {
    alreadyLoggedIn(dispatch);
  }

  return <>{token ? children : <Navigate to={"/"} />}</>;
};
