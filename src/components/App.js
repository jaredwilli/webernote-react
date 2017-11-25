import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import PageContainer from '../containers/pageContainer';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import AuthorizedRoute from '../containers/AuthorizedRoute';

// import HomePage from '../pages/HomePage';
import PrimaryPage from '../pages/PrimaryPage';

const App = ({ ...props }) => {

    return (
        <Provider store={props.store}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/auth"
                        component={UnauthorizedPage} />
                    <AuthorizedRoute
                        path="/app"
                        component={PrimaryPage}  />
                    <Redirect to="/app" />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
