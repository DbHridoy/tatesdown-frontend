import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/authApi";
import authReducer from "./slice/authSlice";

// 🧩 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// 🧩 2. Setup persist config (only persist auth)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth state
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
    ),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

// 5. Create persistor
export const persistor = persistStore(store);
