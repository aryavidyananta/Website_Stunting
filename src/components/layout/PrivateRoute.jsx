/* eslint-disable react/prop-types */
import MainLayout from "./Main";


const PrivateRoute = ({ component }) => {

  return <MainLayout> {component} </MainLayout>;
};

export default PrivateRoute;
