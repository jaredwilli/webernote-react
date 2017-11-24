import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';

const UnauthorizedPage = () => {

    return (
        <div className="unauthorized">
            {/*
            Imagine this could be a general layout for all unauthorized pages like
            the login page, forgot password, email-verified, etc...

            For this example project, we'll just have a Login Page
            */}

            <Switch>
                <Route
                    path="/auth/login"
                    component={LoginPage} />
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    );
};

export default UnauthorizedPage;
