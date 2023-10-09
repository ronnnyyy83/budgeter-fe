import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducers } from '../reducers';
import { rootSaga } from '../sagas';
import { createBrowserHistory } from 'history';

// @ts-ignore
const hasReduxDevTools = process.env.NODE_ENV !== 'production' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
const history = createBrowserHistory();
const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = hasReduxDevTools || compose;

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export {
  store, history
}