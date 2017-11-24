import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthorizedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps = (nextProps) => {
        const { user } = nextProps;

        if (user && user.uid) {
            this.setState({
                user: user
            });
        }
    }

    render() {
        const { component: Component, pending, ...rest} = this.props;
        const { user } = this.state;
        // debugger;

        if (!user) {
            return <div className="loading">Loading...</div>;
        }

        return (
            <Route {...rest} render={props => {
                if (pending) return <div className="loading">Loading...</div>;

                {/* return (!this.state.user || !this.state.user.isAnonymous)
                    ? <Component
                        user={this.state.user}
                        {...rest}
                        {...props} />
                    : <Redirect to="/auth/login" /> */}
                return (
                    <Component
                        user={this.state.user}
                        {...rest}
                        {...props} />
                );
            }} />
        );
    }
}

const stateToProps = ({ userData }) => ({
    pending: userData.pending,
    user: userData.user
});

export default connect(stateToProps)(AuthorizedRoute);
