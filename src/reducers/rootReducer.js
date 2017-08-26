import { combineReducers } from 'redux';
import { noteReducer } from './noteReducer.js';

const rootReducer = combineReducers({
    note: noteReducer
});

export default rootReducer;
