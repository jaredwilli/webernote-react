import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import notebookReducer from './notebookReducer';

const rootReducer = combineReducers({
    noteData: noteReducer,
    bookData: notebookReducer
});

export default rootReducer;
