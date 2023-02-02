import React, {useContext} from 'react';
import {Route, Navigate} from "react-router-dom";
import { AuthContext } from './Auth';

const PrivateRoute = ({component:RouterComponent,...rest})=>{
    const {currentUser} = useContext(AuthContext);
    return(
        <Route>
            {rest}
            render={routerProps =>
            !!currentUser ?(
                <RouterComponent {...routerProps} />
            ) : (
                <Navigate to={"/login"} />
            )
            }
        </Route>
    );
};

export default PrivateRoute;