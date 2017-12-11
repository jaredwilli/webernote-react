import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import PageContainer from '../containers/pageContainer';

const App = (props) => {
    return (
        <Provider store={props.store}>
            <BrowserRouter>
                <PageContainer page="home" />
            </BrowserRouter>
        </Provider>
    );
};

App.propTypes = {
    store: PropTypes.object
};

export default App;
