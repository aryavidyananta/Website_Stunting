/* eslint-disable react/prop-types */
import { useContext } from "react";

// import { AuthContext } from "../../providers/AuthProvider";
import Main from "./Main";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate } from "react-router-dom";
import LoginPage from "../Login/Login";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn, userProfile, isLoading } = useContext(AuthContext);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn && !isLoading) {
    if (userProfile.roles === "Admin") {
      // Redirect to login page or any other public route
      return <Main> {component} </Main>;
    } else {
      return component;
    }
  } else if (!isLoading && !isLoggedIn) {
    return <Navigate to="/LoginPage" replace />; // <LoginPage />;
  }
  // return <Navigate to="/LoginPage" replace />;
  return <>bebas</>;

  // Render the child component or outlet
};

export default PrivateRoute;
