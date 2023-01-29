import { createSlice } from '@reduxjs/toolkit';
import Transaction from '../../models/Transaction';

export interface TransactionsState {
    transactions: Transaction[];
}

const initialState: TransactionsState = {
    transactions: [],
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, {payload}) => {
            state.transactions = [...payload];
        },
        updateTransactions: (state, { payload }) => {
            state.transactions = [...state.transactions, ...payload];
        },
        cleanTransaction: (state) => {
            state.transactions = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateTransactions, setTransactions, cleanTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;