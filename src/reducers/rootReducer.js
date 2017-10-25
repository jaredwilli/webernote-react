import { combineReducers } from 'redux';

import userReducer from './userReducer';
import noteReducer from './noteReducer';
import notebookReducer from './notebookReducer';
import tagReducer from './tagReducer';
import labelReducer from './labelReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    userData: userReducer,
    noteData: noteReducer,
    notebookData: notebookReducer,
    tagData: tagReducer,
    labelData: labelReducer,
    modal: modalReducer
});

export default rootReducer;
