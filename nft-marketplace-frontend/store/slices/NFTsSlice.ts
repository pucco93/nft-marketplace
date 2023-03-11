import { createSlice } from '@reduxjs/toolkit';
import NFT from '../../models/NFT';

export interface NFTsState {
    value: NFT[];
}

const initialState: NFTsState = {
    value: [],
}

export const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setNFTs: (state, {payload}) => {
            state.value = [...payload];
        },
        updateNFTs: (state, { payload }) => {
            state.value = [...state.value, ...payload];
        },
        deleteNFTs: (state) => {
            state.value = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateNFTs, deleteNFTs, setNFTs } = nftsSlice.actions;

export default nftsSlice.reducer;