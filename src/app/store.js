
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import lmsSlice from "../features/lmsSlice";


// Combine your Redux slices into a root reducer.
const reducers = combineReducers({
  app: lmsSlice,
});

// Configure Redux Persist to save and load your Redux store state
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['lmsSlice']
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);