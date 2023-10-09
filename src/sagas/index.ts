import { all, call } from 'redux-saga/effects';
import { ListSaga } from './list';
import { UserSaga, loadStore } from './user';

function* rootSaga() {
  yield all([
    UserSaga(),
    ListSaga(),
    call(loadStore)
  ]);
};

export {
  rootSaga
};