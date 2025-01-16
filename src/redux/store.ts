import {configureStore} from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzasReducer from './slices/pizzasItemsFromBack'

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        pizzasReducer,
    }
})