/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import statReducer, { StatState } from './slices/statSlice';
import statSaga from './sagas/statSaga';

const sagaMiddleware = createSagaMiddleware();

const store: EnhancedStore<{
  stats: StatState;
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
      stats: StatState;
  }, undefined, UnknownAction>;
}>, StoreEnhancer]>> = configureStore({
  reducer: {
    stats: statReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(statSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
