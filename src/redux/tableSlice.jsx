import { createSlice } from '@reduxjs/toolkit';

// for sorting and filtering variables
export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        sorting: {},
        brandsToFilter: [],
        searchForBrands: '',
        tagsToFilter: {},
        searchForTags: '',
        productTypeToFilter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.sorting = { ...action.payload };
        },
        setBrandsToFilter: (state, action) => {
            state.brandsToFilter = [...action.payload];
        },
        setSearchForBrands: (state, action) => {
            state.searchForBrands = action.payload;
        },
        setTagsToFilter: (state, action) => {
            state.tagsToFilter = { ...action.payload };
        },
        setSearchForTags: (state, action) => {
            state.searchForTags = action.payload;
        },
        setProductTypeToFilter: (state, action) => {
            state.productTypeToFilter = action.payload;
        },
    },
});

export const {
    setFilter,
    setBrandsToFilter,
    setSearchForBrands,
    setTagsToFilter,
    setSearchForTags,
    setProductTypeToFilter,
} = tableSlice.actions;

export const selectTable = (state) => state.table;

export default tableSlice.reducer;
