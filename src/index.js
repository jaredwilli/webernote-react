// root container component
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/index';
import { listenForAuth } from './actions/userActions';
import App from './App';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import './styles/base.css';
import './styles/helpers.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/welcome-msg.css';
import './styles/note-nav.css';
import './styles/note-types.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore;

store.dispatch((dispatch) => {
    dispatch(listenForAuth());
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
