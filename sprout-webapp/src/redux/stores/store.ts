import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../slices";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { taskApi } from "../api";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  [taskApi.reducerPath]: taskApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(taskApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
