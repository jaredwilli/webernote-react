import React, { PropTypes} from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../actions/modalActions';
import Modal from './Modal';

import '../styles/login.css';
import '../styles/buttons.css';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.close();
    }

    render() {
        return (
            <Modal onClose={this.onClose}>
                <div className="login">
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

LoginModal.propTypes = {
    onClose: PropTypes.func
}

export default connect(null, { showModal, hideModal })(LoginModal);
