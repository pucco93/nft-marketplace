import { createSlice } from '@reduxjs/toolkit';
import { Contract } from 'web3-eth-contract';

export interface ContractState {
    contract: Contract | null;
}

const initialState: ContractState = {
    contract: null,
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, { payload }) => {
            state.contract = payload;
        },
        deleteContract: (state) => {
            state.contract = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setContract, deleteContract } = contractSlice.actions;

export default contractSlice.reducer;