// root container component
import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';

import { listenForAuth } from './actions/userActions';
import AppContainer from './containers/appContainer';

import Notebooks from './components/Notebooks';
import Tags from './components/Tags';
import Labels from './components/Labels';

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
        return (
            <div>
                <AppContainer />

                {/* <Route path="/" component={WebernoteApp} /> */}
                <Route path="/notebooks/:notebookName" component={Notebooks} />
                <Route path="/tags/:tagValue" component={Tags} />
                <Route path="/labels/:labelName" component={Labels} />
            </div>
        );
    }
}

export default WebernoteApp;

ReactDOM.render(
    <Provider store={configureStore}>
        <Router>
            <WebernoteApp />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
