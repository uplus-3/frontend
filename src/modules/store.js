import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { rootSaga } from './index.js';
import createSagaMiddleware from 'redux-saga';

/**
 * 담당자 : 김수현
 */
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
