// root container component
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';

import { listenForAuth } from './actions/userActions';
import AppContainer from './containers/appContainer';

import './index.css';
import './styles/base.css';
import './styles/helpers.css';

import registerServiceWorker from './registerServiceWorker';

class WebernoteApp extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.store = configureStore;

        this.store.dispatch(listenForAuth());
    }

    render() {
        return <AppContainer />;
    }
}

export default WebernoteApp;

ReactDOM.render(
    <Provider store={configureStore}>
        <WebernoteApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
