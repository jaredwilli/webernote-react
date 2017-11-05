// root container component
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/index';
import App from './App';

import './import.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
