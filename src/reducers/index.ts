import { combineReducers } from 'redux';
import { userReducer } from './user';
import { listReducer } from './list';

export interface State {
  user: any;
  list: any;
}

const rootReducers = combineReducers<State>({
  user: userReducer,
  list: listReducer
});

export {
  rootReducers
};