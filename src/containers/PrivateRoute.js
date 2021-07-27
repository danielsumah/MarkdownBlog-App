import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authenticationService } from '../services/authentication-services';

const PrivateRoute = ({component: Component, ...rest})=>{
    return (
        <Route {...rest} render={props=>{
            if (authenticationService.isAuthenticated){
                return <Component {...props}/>
            }
            return <Redirect to='/login'/>
        }}/>
    )
}

export default PrivateRoute;