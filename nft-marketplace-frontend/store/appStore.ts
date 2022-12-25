import { configureStore } from '@reduxjs/toolkit';
import { alertsSlice } from './slices/AlertsSlice';
import { connectAccountSlice } from './slices/ConnectAccountSlice';
import { loadingSlice } from './slices/LoadingSlice';

export const store = configureStore({
  reducer: {
    connectAccount: connectAccountSlice.reducer,
    alert: alertsSlice.reducer,
    loading: loadingSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;