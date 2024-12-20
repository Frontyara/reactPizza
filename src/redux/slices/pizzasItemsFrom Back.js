import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    pizzasItems: []
}
const pizzasItems = createSlice({
    name: 'Pizzas',
    initialState,
    reducers:{
        getPizzas(state, action){
            state.pizzasItems = action.payload
        }
    }
})
export const {getPizzas} = pizzasItems.actions
export default pizzasItems.reducer