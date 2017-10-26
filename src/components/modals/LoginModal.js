import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../../actions/modalActions';
import Modal from '../Modal';

import '../../styles/login.css';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    render() {

        return (
            <Modal onClose={this.onClose} dialogStyle={this.props.dialogStyle}>
                <div className="login">
                    <h1>Choose a login method:</h1>
                    <div className="login-with btn-group">
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
                </div>
            </Modal>
        );
    }
}

export default connect(null, { showModal, hideModal })(LoginModal);
