import { combineReducers } from 'redux';

import noteReducer from './noteReducer';
import notebookReducer from './notebookReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({
    noteData: noteReducer,
    notebookData: notebookReducer,
    tagData: tagReducer
});

export default rootReducer;
