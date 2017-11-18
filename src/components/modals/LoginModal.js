import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal, hideModal } from '../../actions/modalActions';

import Modal from '../ui/Modal';
import LoginButtons from '../stateless/LoginButtons';

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
                <div className="login-modal">
                    <div className="modal-header">
                        <h1>Choose a login method:</h1>
                    </div>

                    <LoginButtons login={this.props.login} />
                </div>
            </Modal>
        );
    }
}

export default withRouter(connect(null, { showModal, hideModal })(LoginModal));
