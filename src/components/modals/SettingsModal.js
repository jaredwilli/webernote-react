import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../../actions/modalActions';
import Modal from '../Modal';

class SettingsModal extends React.Component {
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
                <div className="settings-modal">
                    <h1>Settings</h1>

                    <div className="preferences">
                        Some form here
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(null, { showModal, hideModal })(SettingsModal);
