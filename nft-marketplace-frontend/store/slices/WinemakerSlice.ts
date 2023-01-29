import { createSlice } from '@reduxjs/toolkit';

export interface WinemakerState {
    isWinemaker: boolean;
}

const initialState: WinemakerState = {
    isWinemaker: false,
}

export const winemakerSlice = createSlice({
    name: 'winemaker',
    initialState,
    reducers: {
        setWinemaker: (state) => {
            state.isWinemaker = true;
        },
        unsetWinemaker: (state) => {
            state.isWinemaker = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setWinemaker, unsetWinemaker } = winemakerSlice.actions;

export default winemakerSlice.reducer;