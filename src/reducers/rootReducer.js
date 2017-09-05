import { combineReducers } from 'redux';

import noteReducer from './noteReducer';
import notebookReducer from './notebookReducer';

const rootReducer = combineReducers({
    noteData: noteReducer,
    notebookData: notebookReducer
});

export default rootReducer;
