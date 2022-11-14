import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        sorting: {},
    },
    reducers: {
        setFilter: (state, action) => {
            state.sorting = { ...action.payload };
        },
    },
});

export const { setFilter } = tableSlice.actions;

export const selectTable = (state) => state.table;

export default tableSlice.reducer;
