import { ShowModal, HideModal } from '../constants/actionTypes';

export const showModal = (type, props) => {
    return {
        type: ShowModal,
        payload: {
            type: type,
            props: props
        }
    };
};

export const hideModal = () => ({
    type: HideModal
});
