import { createSlice } from '@reduxjs/toolkit';
import Loading from '../../models/Loading';

export interface LoadingState {
    loading: Loading;
}

const initialState: LoadingState = {
    loading: { show: false, msg: '' },
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = {
                show: payload.show,
                msg: payload.msg,
            };
        },
        cancelLoading: (state) => {
            state.loading = {
                show: false,
                msg: '',
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading, cancelLoading } = loadingSlice.actions;

export default loadingSlice.reducer;