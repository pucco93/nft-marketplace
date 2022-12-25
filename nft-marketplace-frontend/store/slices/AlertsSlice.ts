import { createSlice } from '@reduxjs/toolkit';
import Alert from '../../models/Alert';

export interface AlertsState {
    alert: Alert;
}

const initialState: AlertsState = {
    alert: { show: false, msg: '', color: '' },
}

export const alertsSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        createAlert: (state, { payload }) => {
            state.alert = {
                show: payload.show,
                msg: payload.msg,
                color: payload.color
            };
        },
        deleteAlert: (state) => {
            state.alert = {
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