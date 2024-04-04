import { useUserAuth } from '@/context/userAuthContext';
import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

interface IProtectedRoutes {

}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutes> = () => {
    //only logon user can able to access those routes
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    //this location hook gonna tell the login page from which page gonna redirect it to the login in page
    const location = useLocation();
    //if isAuth is false, app will naviagte the user to the login page
    if(loading) {
      return <div>You're logon!</div>;
    }
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location}} />
  );
};

export default ProtectedRoutes;