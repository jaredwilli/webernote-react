import { combineReducers } from 'redux';
import noteReducer from './noteReducer';

const rootReducer = combineReducers({
    note: noteReducer
});

export default rootReducer;
