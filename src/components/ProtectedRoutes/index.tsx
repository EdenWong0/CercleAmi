import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface IProtectedRoutes {

}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutes> = (props) => {
    //only logon user can able to access those routes
    const isAuth: boolean = false;
    //this location hook gonna tell the login page from which page gonna redirect it to the login in page
    const location = useLocation();
    //if isAuth is false, app will naviagte the user to the login page
    return isAuth ? (<Outlet />) : (
      <Navigate to="/login" state={{ from: location}} />
  );
};

export default ProtectedRoutes;