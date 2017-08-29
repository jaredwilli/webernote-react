import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import NotesContainer from './containers/notes.js';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <NotesContainer />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
