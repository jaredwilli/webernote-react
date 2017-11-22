// root container component
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/index';
import { listenForAuth } from './actions/userActions';
import App from './components/App';

import './styles/import.css';

// import registerServiceWorker from './registerServiceWorker';

const store = configureStore;

store.dispatch((dispatch) => {
    dispatch(listenForAuth());
});

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);

// registerServiceWorker();
