import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { api } from "./services/api";

const store = configureStore({
  reducer: { user: userSlice, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
