import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: 0,
    sort: {

    }
}
const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategory(state,action){
            state.category = action.payload
        }
        // setSort(state,action)
    }
})

export const {setCategory} = filterSlice.actions

export default filterSlice.reducer