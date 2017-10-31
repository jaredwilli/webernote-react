import { env } from '../../data/firebase';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal, hideModal } from '../../actions/modalActions';
import Modal from '../ui/Modal';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    render() {
        let loginButtons = '';

        // Only have fb login for development environment
        if (env === 'development') {
            loginButtons = (
                <div className="modal-body login-with btn-group">
                    <button onClick={(e) => this.props.login('fbProvider')}
                        className="facebook">
                        <i className="fa fa-facebook"></i>
                        <span className="btn-text">Sign in with Facebook</span>
                    </button>
                </div>
            );
        } else if (env === 'production') {
            loginButtons = (
                <div className="modal-body login-with btn-group">
                    <button onClick={(e) => this.props.login('fbProvider')}
                        className="facebook">
                        <i className="fa fa-facebook"></i>
                        <span className="btn-text">Sign in with Facebook</span>
                    </button>
                    <button onClick={(e) => this.props.login('gProvider')}
                        className="google">
                        <i className="fa fa-google"></i>
                        <span className="btn-text">Sign in with Google</span>
                    </button>
                    <button onClick={(e) => this.props.login('twProvider')}
                        className="twitter">
                        <i className="fa fa-twitter"></i>
                        <span className="btn-text">Sign in with Twitter</span>
                    </button>
                    <button onClick={(e) => this.props.login('ghProvider')}
                        className="github">
                        <i className="fa fa-github"></i>
                        <span className="btn-text">Sign in with Github</span>
                    </button>
                </div>
            );
        }

        return (
            <Modal onClose={this.onClose} dialogStyle={this.props.dialogStyle}>
                <div className="login-modal">
                    <div className="modal-header">
                        <h1>Choose a login method:</h1>
                    </div>

                    {loginButtons}
                </div>
            </Modal>
        );
    }
}

export default withRouter(connect(null, { showModal, hideModal })(LoginModal));
