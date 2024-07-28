import { call, put, takeEvery } from 'redux-saga/effects';
import axios , { AxiosResponse } from 'axios';
import { setTopScores, setLastUpdate, fetchTopScoresAction,  Stat, setLoading, setTotalCount , setToast, setRepeatedIds } from '../slices/statSlice';

interface StatReponse {
  totalCount: number;
  count: number;
  stats : Stat[];
  changeCount: number;
  repeatedIds: number[];
}

function* fetchTopScores() {
  try {
    yield put(setLoading(true));
    const { data }: AxiosResponse<StatReponse> = yield call(axios.get, 'http://localhost:3001/api/top');

    yield put(setTopScores(data.stats));
    yield put(setTotalCount(data.totalCount));
    yield put(setLastUpdate(new Date().toISOString()));
    yield put(setLoading(false));
    yield put(setRepeatedIds(data.repeatedIds));
    const successMessage = data.stats.length >= 10
      ? `Top scores fetched successfully! ${data.changeCount} rows changed.`
      : 'Top scores fetched successfully!';

    yield put(setToast({ type: 'success', text: successMessage, show: true }));
  } catch (error) {
    console.error('Error fetching top scores:', error);
    yield put(setToast({ type: 'error', text: 'Error fetching top scores.', show: true }));
    yield put(setLoading(false));
  }
}

function* statSaga() {
  yield takeEvery(fetchTopScoresAction.type, fetchTopScores);
}

export default statSaga;
