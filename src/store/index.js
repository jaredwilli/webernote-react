import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();

const configureStore = createStore(
	rootReducer,
	{},
	applyMiddleware(thunk, logger)
);

export default configureStore;
