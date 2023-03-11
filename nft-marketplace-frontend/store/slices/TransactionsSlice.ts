import { createSlice } from '@reduxjs/toolkit';
import Transaction from '../../models/Transaction';

export interface TransactionsState {
    value: Transaction[];
}

const initialState: TransactionsState = {
    value: [],
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, {payload}) => {
            state.value = [...payload];
        },
        updateTransactions: (state, { payload }) => {
            state.value = [...state.value, ...payload];
        },
        cleanTransaction: (state) => {
            state.value = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateTransactions, setTransactions, cleanTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;