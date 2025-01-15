import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const asyncGetPizzas = createAsyncThunk('pizzas/asyncGetPizzas', async(props: any):Promise<any> => {
    const data = await fetch(
      `https://6755b80511ce847c992af30a.mockapi.io/pizzas?${
        props.categoryId == 0 ? "" : `category=${props.categoryId}`
      }${
        props.sortId == 0
          ? "&sortBy=rating&order=asc"
          : props.sortId == 1
          ? "&sortBy=rating&order=desc"
          : props.sortId == 2
          ? "&sortBy=price&order=asc"
          : props.sortId == 3
          ? "&sortBy=price&order=desc"
          : props.sortId == 4
          ? "&sortBy=name&order=asc"
          : "&sortBy=name&order=desc"
      }`
    )
    const jsonData = await data.json()
    return  jsonData
})

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
    },
    extraReducers:(builder) => {
            builder.addCase(asyncGetPizzas.pending, () => {
            })
            builder.addCase(asyncGetPizzas.fulfilled, (state, action) => {
                state.pizzasItems = action.payload
            })
            builder.addCase(asyncGetPizzas.rejected, () => {
            })
        }
})
export const {getPizzas} = pizzasItems.actions
export default pizzasItems.reducer