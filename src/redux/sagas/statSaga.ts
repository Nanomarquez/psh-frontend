import { call, put, takeEvery } from 'redux-saga/effects';
import axios , { AxiosResponse } from 'axios';
import { setTopScores, setLastUpdate, fetchTopScoresAction,  Stat, setLoading, setTotalCount } from '../slices/statSlice';

interface StatReponse {
  totalCount: number;
  count: number;
  stats : Stat[];
}

function* fetchTopScores() {
  try {
    yield put(setLoading(true));
    const { data }: AxiosResponse<StatReponse> = yield call(axios.get, 'http://localhost:3001/api/top');

    yield put(setTopScores(data.stats));
    yield put(setTotalCount(data.totalCount));
    yield put(setLastUpdate(new Date().toISOString()));
    yield put(setLoading(false));
  } catch (error) {
    console.error('Error fetching top scores:', error);
    yield put(setLoading(false));
  }
}

function* statSaga() {
  yield takeEvery(fetchTopScoresAction.type, fetchTopScores);
}

export default statSaga;
