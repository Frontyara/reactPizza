import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: 0,
    sort: 0,
    search: '',
}
const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategory(state,action){
            state.category = action.payload
        },
        setSort(state,action){
            state.sort = action.payload
        },
        setSearchRedux(state,action){
            state.search = action.payload
        }
    }
})

export const {setCategory,setSort,setSearchRedux} = filterSlice.actions

export default filterSlice.reducer