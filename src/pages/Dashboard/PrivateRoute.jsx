/* eslint-disable react/prop-types */
import { useContext } from "react";

// import { AuthContext } from "../../providers/AuthProvider";
import LoginPage from "../Login/Login";
import Main from "./Main";
import { AuthContext } from "../../providers/AuthProviders";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    // Redirect to login page or any other public route
    return <Main> {component} </Main>;
  }
  // return <Navigate to="/login" replace />;
  return <LoginPage />;

  // Render the child component or outlet
};

export default PrivateRoute;
