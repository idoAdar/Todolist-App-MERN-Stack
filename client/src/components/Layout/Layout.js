import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../utills/privateRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Main/Main';
import Edit from '../Dashboard/Edit/Edit';

import setAuthToken from '../../utills/setAuthToken';
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const Layout = props => {
    return (
        <Fragment>
            <main>
                <Switch>
                    <Route path={'/'} exact component={Register}/>
                    <Route path={'/login'} component={Login}/>
                    <PrivateRoute isAuth={props.isAuth} path={"/dashboard/:id"} component={Edit}/>
                    <PrivateRoute isAuth={props.isAuth} path={'/dashboard'} component={Dashboard}/>
                </Switch>
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthentication
    }
}

export default connect(mapStateToProps, null)(Layout);