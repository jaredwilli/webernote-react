// root container component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';

import { listenForAuth } from './actions/userActions';
import { getNotes } from './actions/noteActions';
import { getNotebooks, listenForDeletedNotebook } from './actions/notebookActions';
import { getTags, listenForDeletedTags } from './actions/tagActions';

// import NotesContainer from './containers/notesContainer';
import AppContainer from './containers/appContainer';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

export default class WebernoteApp extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.store = configureStore;

        this.store.dispatch(listenForAuth());
        this.store.dispatch(getNotes());
        this.store.dispatch(getNotebooks());
        this.store.dispatch(getTags());

        this.store.dispatch(listenForDeletedNotebook());
        this.store.dispatch(listenForDeletedTags());
    }

    render() {
        return <AppContainer />;
    }
}

ReactDOM.render(
    <Provider store={configureStore}>
        <WebernoteApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
