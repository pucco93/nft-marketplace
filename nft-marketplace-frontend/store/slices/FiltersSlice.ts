import { createSlice } from '@reduxjs/toolkit';
import Filters from '../../models/Filters';

export interface FiltersState {
    value: Filters;
}

const initialState: FiltersState = {
    value: { bottomPrice: 0, topPrice: 10, winery: '', year: undefined, count: 12, sortField: undefined, sortOrder: undefined },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPrices: (state, { payload }) => {
            state.value = {
                ...state.value, bottomPrice: payload.bottomPrice, topPrice: payload.topPrice
            };
        },
        setWinery: (state, { payload }) => {
            state.value = {
                ...state.value, winery: payload
            }
        },
        setYear: (state, { payload }) => {
            state.value = {
                ...state.value, year: payload
            }
        },
        setCount: (state, { payload }) => {
            state.value = {
                ...state.value, count: payload
            }
        },
        setSortField: (state, { payload }) => {
            state.value = {
                ...state.value, sortField: payload
            }
        },
        setSortOrder: (state, { payload }) => {
            state.value = {
                ...state.value, sortOrder: payload
            }
        },
        cleanFilters: (state) => {
            state.value = {
                ...state.value,
                bottomPrice: 0,
                topPrice: 10,
                winery: '',
                year: undefined,
                count: 12,
                sortField: undefined,
                sortOrder: undefined
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const { setPrices, setWinery, setYear, setCount, setSortField, setSortOrder, cleanFilters } = filterSlice.actions;

export default filterSlice.reducer;