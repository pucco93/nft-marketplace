import { createSlice } from '@reduxjs/toolkit';
import { Contract } from 'web3-eth-contract';

export interface ContractState {
    value: Contract | null;
}

const initialState: ContractState = {
    value: null,
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, { payload }) => {
            state.value = payload;
        },
        deleteContract: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setContract, deleteContract } = contractSlice.actions;

export default contractSlice.reducer;