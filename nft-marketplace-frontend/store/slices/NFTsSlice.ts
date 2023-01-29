import { createSlice } from '@reduxjs/toolkit';
import NFT from '../../models/NFT';

export interface NFTsState {
    nfts: NFT[];
}

const initialState: NFTsState = {
    nfts: [],
}

export const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setNFTs: (state, {payload}) => {
            state.nfts = [...payload];
        },
        updateNFTs: (state, { payload }) => {
            state.nfts = [...state.nfts, ...payload];
        },
        deleteNFTs: (state) => {
            state.nfts = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateNFTs, deleteNFTs } = nftsSlice.actions;

export default nftsSlice.reducer;