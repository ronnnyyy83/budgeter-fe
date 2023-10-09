import { call, takeEvery, put } from 'redux-saga/effects';
import { makeAPIRequest } from '../utils/api';
import { userActions, loginUserSuccess, loginUserFailed, registerUserSuccess, registerUserFailed } from '../actions/user';

function* loginUserSaga(action) {
  try{
    const username = action.payload.username;
    const password = action.payload.password
    const results = yield call(() => makeAPIRequest('http://localhost:8080/api/v1/auth/signin', 'POST', {
      username: username,
      password: password
    }));

    if (!(results instanceof Error) && results.status === 'success') {
      localStorage.setItem('user', JSON.stringify(results.data));
      yield put(loginUserSuccess(results.data));
    } else {
      console.log('errr')
      yield put(loginUserFailed());
    }
  } catch (err) {
    console.log('error', err)
    yield put(loginUserFailed());
  }
}

function* registerUserSaga(action) {
  try{
    const username = action.payload.username;
    const password = action.payload.password;
    const city = action.payload.city;
    const country = action.payload.country;
    const allowShare = action.payload.allowShare;

    const results = yield call(() => makeAPIRequest('http://localhost:8080/api/v1/auth/signup', 'POST', {
      username: username,
      password: password,
      city: city,
      country: country,
      allowShare: allowShare
    }));

    if (!(results instanceof Error) && results.status === 'success') {
      localStorage.setItem('user', JSON.stringify(results.data));
      yield put(registerUserSuccess(results.data));
    } else {
      console.log('errr')
      yield put(registerUserFailed());
    }
  } catch (err) {
    console.log('error', err)
    yield put(registerUserFailed());
  }
}

function* UserSaga() {
  yield takeEvery(userActions.LOGIN_USER, loginUserSaga);
  yield takeEvery(userActions.REGISTER_USER, registerUserSaga);
}

function* loadStore() {
  // Find way to know if user is auth before doing the calls below
  // if (isAuthenticated()) {
  //   yield put(getUser());
  // }
}

export { UserSaga, loadStore };
