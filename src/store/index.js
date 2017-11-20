import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();
const initialState = {};

// Set up Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default configureStore;
