import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../../actions/modalActions';
import Modal from '../Modal';

import '../../styles/buttons.css';
import '../../styles/settings.css';

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

            </Modal>
        );
    }
}

export default connect(null, { showModal, hideModal })(SettingsModal);
