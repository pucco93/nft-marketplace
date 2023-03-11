import { createSlice } from '@reduxjs/toolkit';

export interface ConnectAccountState {
  value: string
}

const initialState: ConnectAccountState = {
  value: '',
}

export const connectAccountSlice = createSlice({
  name: 'connectAccount',
  initialState,
  reducers: {
    connect: (state, {payload}) => {
      state.value = payload;
    },
    disconnect: (state) => {
      state.value = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectAccountSlice.actions;

export default connectAccountSlice.reducer;