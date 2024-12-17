import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    totalCount: 0,
    totalPrice: 0,
    items: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            state.items.push(action.payload)
            ++state.totalCount
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