import { ColorMode, useColorMode } from '@chakra-ui/react';
import { createSlice } from '@reduxjs/toolkit';


export interface ThemeState {
  theme: ColorMode;
}

const initialState: ThemeState = {
  theme: 'dark',
}

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
export const { } = counterSlice.actions;

export default counterSlice.reducer;