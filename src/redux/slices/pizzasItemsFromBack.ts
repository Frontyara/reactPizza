import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const getPizzasItems = createAsyncThunk('Pizzas/getPizzasItems', async({categoryId, sortId}:any) => {
    const data = await fetch(`https://6755b80511ce847c992af30a.mockapi.io/pizzas?${
          categoryId == 0 ? "" : `category=${categoryId}`
        }${
          sortId == 0
            ? "&sortBy=rating&order=asc"
            : sortId == 1
            ? "&sortBy=rating&order=desc"
            : sortId == 2
            ? "&sortBy=price&order=asc"
            : sortId == 3
            ? "&sortBy=price&order=desc"
            : sortId == 4
            ? "&sortBy=name&order=asc"
            : "&sortBy=name&order=desc"
        }`)
    const result = await data.json()
    return result
})

const initialState = {
    status: '',
    pizzasItems: [],
}
const pizzasItems = createSlice({
    name: 'Pizzas',
    initialState,
    reducers:{
        getPizzas(state, action){
            state.pizzasItems = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getPizzasItems.pending,(state) => {
            state.status = 'pending'
        })
        builder.addCase(getPizzasItems.fulfilled,(state, action) => {
            state.status = 'OK'
            state.pizzasItems = action.payload
        })
        builder.addCase(getPizzasItems.rejected,(state) => {
            state.status = 'error'
        })
    }
})
export const {getPizzas} = pizzasItems.actions
export default pizzasItems.reducer