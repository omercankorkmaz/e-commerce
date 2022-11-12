import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {},
    reducers: {
        add: (state, action) => {
            const { payload } = action;
            if (!state[payload.slug]) state[payload.slug] = 1;
            else state[payload.slug] += 1;
        },
        remove: (state, action) => {
            if (state[action.slug]) {
                state[action.slug] -= 1;
            }
        },
    },
});

export const { add, remove } = basketSlice.actions;

export const selectBasket = (state) => state.basket;

export default basketSlice.reducer;
