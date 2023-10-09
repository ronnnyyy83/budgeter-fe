import { call, takeEvery, put, select } from 'redux-saga/effects';
import { makeAPIRequestWithToken } from '../utils/api';
import { listActions, getCityCountrySuccess } from '../actions/list';
import { State as RootState } from '../reducers';

function* getCityCountrySaga(action) {
  const { user }: RootState = yield select();
  try{
    const results = yield call(() => makeAPIRequestWithToken('http://localhost:8080/api/v1/countryCities', 'GET', user.token, null));

    if (!(results instanceof Error) && results.status === 'success') {
      yield put(getCityCountrySuccess(results.data));
    } else {
      console.log('errr');
    }
  } catch (err) {
    console.log('error', err);
  }
}

function* ListSaga() {
  yield takeEvery(listActions.GET_CITY_COUNTRY, getCityCountrySaga);
}

export { ListSaga };
