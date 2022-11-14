import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import tableReducer from './tableSlice';

export default configureStore({
    reducer: {
        basket: basketReducer,
        table: tableReducer,
    },
});
