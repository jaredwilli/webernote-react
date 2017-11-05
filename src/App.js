import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppContainer from './containers/appContainer';
import { listenForAuth } from './actions/userActions';

import './index.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        // kick off the anonymous or user auth
        props.dispatch(listenForAuth());

        this.state = {
            user: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.userData.inProgress && !this.props.userData.user) {
            this.setState({
                user: nextProps.userData.user
            });
        }
    }

    render() {
        const { userData } = this.props;

        if (!userData.user) {
            return <div className="loading">Loading...</div>
        }

        return (
            <AppContainer />
        );
    }
}

export default withRouter(connect(state => state)(App));
