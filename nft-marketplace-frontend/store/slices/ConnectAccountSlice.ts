import { createSlice } from '@reduxjs/toolkit';

export interface ConnectAccountState {
  connectedAccount: string
}

const initialState: ConnectAccountState = {
    connectedAccount: '',
}

export const connectAccountSlice = createSlice({
  name: 'connectAccount',
  initialState,
  reducers: {
    connect: (state, {payload}) => {
      state.connectedAccount = payload;
    },
    disconnect: (state) => {
      state.connectedAccount = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectAccountSlice.actions;

export default connectAccountSlice.reducer;