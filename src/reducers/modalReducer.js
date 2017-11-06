import { ShowModal, HideModal } from '../constants/actionTypes';

const initialModalState = {
    type: null,
    props: {}
};

function modalReducer(state = initialModalState, action) {
    switch (action.type) {

        case ShowModal: {
            const type = action.payload.type;
            const props = action.payload.props;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Showing modal'
            });

            newState.type = type;
            newState.props = props;

            return newState;
        }

        case HideModal: {
            return Object.assign({}, initialModalState);
        }

        default:
            return state;

    }
}

export default modalReducer;
