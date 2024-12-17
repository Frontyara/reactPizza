import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            state.items.push(action.payload)
            // state.totalPrice += action.payload
        },
        removeItem(state, action){
            state.items = state.items.filter(obj => obj.id != action.payload)
            --state.totalCount
        },
        clearItems(state){
            state.items = []
            state.totalCount = 0
        },
    }
})

export const {addItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer