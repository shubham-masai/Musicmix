import { Routes, Route } from "react-router-dom";
import { SignIn } from "../Pages/SignIn";
import { SignUp } from "../Pages/SignUp";
import { Home } from "../Pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
