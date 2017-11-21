import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import PageContainer from '../containers/pageContainer';

class App extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <PageContainer page="home" />
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
