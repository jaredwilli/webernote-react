// root container component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';

import { getNotes } from './actions/noteActions';
import { getNotebooks } from './actions/notebookActions';

import NotesContainer from './containers/notesContainer';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

export default class WebernoteApp extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.store = configureStore;
        this.store.dispatch(getNotes());
        this.store.dispatch(getNotebooks());
    }

    render() {
        return <NotesContainer />;
    }
}

ReactDOM.render(
    <Provider store={configureStore}>
        <WebernoteApp />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
