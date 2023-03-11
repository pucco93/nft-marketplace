import { createSlice } from '@reduxjs/toolkit';
import Alert from '../../models/Alert';

export interface AlertsState {
    value: Alert;
}

const initialState: AlertsState = {
    value: { show: false, msg: '', color: '' },
}

export const alertsSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        createAlert: (state, { payload }) => {
            state.value = {
                show: payload.show,
                msg: payload.msg,
                color: payload.color
            };
        },
        deleteAlert: (state) => {
            state.value = {
                show: false,
                msg: '',
                color: ''
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { createAlert, deleteAlert } = alertsSlice.actions;

export default alertsSlice.reducer;