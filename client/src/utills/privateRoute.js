import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={() => {
            return isAuth ? <Component /> : <Redirect to="/login"/>
        }}/>
    )
}

export default PrivateRoute;