import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    totalPizzas: 0,
    items: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const findItem = state.items.find((obj) => obj.id == action.payload.id && obj.typeItem == action.payload.typeItem && obj.sizeItem == action.payload.sizeItem)
            if(findItem){
                ++findItem.count
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            ++state.totalPizzas
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.actPrice * obj.count) + sum
            }, 0)
            // state.totalPrice += action.payload.price
        },
        removeItem(state, action){
            state.items = state.items.filter((obj) => {
                const value = obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size
                if(!value){
                    return obj
                } else{
                    state.totalPizzas -= obj.count
                    state.totalPrice -= obj.count*obj.actPrice
                }
            })
        },
        removeCount(state,action){
            const findItem = state.items.find(obj => obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size)
            // console.log(findItem)
            --findItem.count
            if(findItem.count == 0){
                state.items = state.items.filter(obj => obj.count != 0)
            }
            --state.totalPizzas
            state.totalPrice -= +findItem.actPrice
        },
        addCount(state,action){
            const findItem = state.items.find(obj => obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size)
            ++findItem.count
            ++state.totalPizzas
            state.totalPrice += +findItem.actPrice
        },
        clearItems(state){
            state.items = []
            state.totalPrice = 0
            state.totalPizzas = 0
        },
    }
})

export const {addItem, removeItem, removeCount,addCount ,clearItems} = cartSlice.actions

export default cartSlice.reducer