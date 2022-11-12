import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';

export default configureStore({
    reducer: {
        basket: basketReducer,
    },
});
