import React from 'react';
import { connect } from 'react-redux';

import LoginModal from '../components/LoginModal';
import { MODAL_TYPES } from '../constants/modalTypes';

const MODAL_COMPONENTS = {
    LOGIN_MODAL: LoginModal
};

const ModalContainer = ({type, props}) => {
    if (!type) {
        return null;
    }

    const ModalComponent = MODAL_COMPONENTS[type];

    return <ModalComponent {...props} />;
};

export default connect(state => state.modal)(ModalContainer);
