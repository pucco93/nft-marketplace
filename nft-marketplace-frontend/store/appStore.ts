import { configureStore } from '@reduxjs/toolkit';
import { alertsSlice } from './slices/AlertsSlice';
import { connectAccountSlice } from './slices/ConnectAccountSlice';
import { winemakerSlice } from './slices/WinemakerSlice';
import { loadingSlice } from './slices/LoadingSlice';
import { transactionsSlice } from './slices/TransactionsSlice';
import { contractSlice } from './slices/ContractSlice';
import { nftsSlice } from './slices/NFTsSlice';
import { filterSlice } from './slices/FiltersSlice';

export const store = configureStore({
  reducer: {
    connectAccount: connectAccountSlice.reducer,
    alert: alertsSlice.reducer,
    loading: loadingSlice.reducer,
    winemaker: winemakerSlice.reducer,
    transactions: transactionsSlice.reducer,
    contract: contractSlice.reducer,
    nfts: nftsSlice.reducer,
    filters: filterSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;