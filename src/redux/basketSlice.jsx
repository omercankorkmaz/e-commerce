import { createSlice } from '@reduxjs/toolkit';

// for basket products' amounts and prices
export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        products: {},
        totalPrice: 0,
    },
    reducers: {
        add: (state, action) => {
            const { payload } = action;
            if (!state.products[payload.slug])
                state.products[payload.slug] = {
                    amount: 1,
                    unitPrice: payload.unitPrice,
                };
            else state.products[payload.slug].amount += 1;
            state.totalPrice += payload.unitPrice;
            const totalPrice = state.totalPrice.toFixed(2);
            state.totalPrice = Number(totalPrice);
        },
        remove: (state, action) => {
            const { payload } = action;
            if (state.products[payload.slug]) {
                state.products[payload.slug].amount -= 1;
                if (state.products[payload.slug].amount === 0) {
                    delete state.products[payload.slug];
                }
            }
            state.totalPrice -= payload.unitPrice;
            const totalPrice = state.totalPrice.toFixed(2);
            state.totalPrice = Number(totalPrice);
        },
    },
});

export const { add, remove } = basketSlice.actions;

export const selectBasket = (state) => state.basket;

export default basketSlice.reducer;
