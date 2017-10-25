import React from 'react';
import { connect } from 'react-redux';

import LoginModal from '../components/modals/LoginModal';
import SettingsModal from '../components/modals/SettingsModal';

const MODAL_COMPONENTS = {
    LOGIN_MODAL: LoginModal,
    SETTINGS_MODAL: SettingsModal
};

const ModalContainer = ({type, props}) => {
    if (!type) {
        return null;
    }

    const ModalComponent = MODAL_COMPONENTS[type];

    return <ModalComponent {...props} />;
};

export default connect(state => state.modal)(ModalContainer);
