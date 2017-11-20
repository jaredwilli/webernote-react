import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from '../containers/appContainer';

class App extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <AppContainer />
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
