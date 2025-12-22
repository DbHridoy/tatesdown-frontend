import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/authApi";
import authReducer from "./slice/authSlice";
import { userApi } from "./api/userApi";
import clientApi from "./api/clientApi";
import quoteApi from "./api/quoteApi";
import commonApi from "./api/common";
import expenseApi from "./api/expenseApi";
import jobApi from "./api/jobApi";
// 🧩 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [clientApi.reducerPath]:clientApi.reducer,
  [quoteApi.reducerPath]:quoteApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
});

// 🧩 2. Setup persist config (only persist auth)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"], // persist auth and user state
};

// 🧩 3. Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(
      authApi.middleware,
      userApi.middleware,
      clientApi.middleware,
      quoteApi.middleware,
      commonApi.middleware,
      expenseApi.middleware,
      jobApi.middleware
    ),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

// 5. Create persistor
export const persistor = persistStore(store);
