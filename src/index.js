// root container component
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/index';
import { loginAnonymously } from './actions/userActions';
import App from './App';

import './styles/import.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore;

store.dispatch((dispatch) => {
    dispatch(loginAnonymously());
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
