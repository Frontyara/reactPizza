import {createSlice} from "@reduxjs/toolkit"



interface IinitialState {
    items: any[];
    totalPrice: string | number;
    totalPizzas: string | number;
}

const getLocalData = () => {
    let itemsLS:  any  = localStorage.getItem("items") || ''
    let priceLS: string = localStorage.getItem('priceCart') || ''
    let totalPizzasLS: string = localStorage.getItem('totalPizzasCart') || ''
    if(itemsLS !== ''){
        itemsLS = JSON.parse(itemsLS)
    }
    if(priceLS !== ''){
        priceLS = JSON.parse(priceLS)
    }
    if(totalPizzasLS !== ''){
        totalPizzasLS = JSON.parse(totalPizzasLS)
    }
    return [itemsLS, priceLS, totalPizzasLS]
}

const initialState: IinitialState = {
    items: getLocalData()[0] || [],
    totalPrice: getLocalData()[1] || '0',
    totalPizzas: getLocalData()[2] || '0',
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state: IinitialState, action){
            const findItem = state.items.find((obj) => obj.id == action.payload.id && obj.typeItem == action.payload.typeItem && obj.sizeItem == action.payload.sizeItem)
            if(findItem){
                ++findItem.count
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPizzas = +state.totalPizzas + 1
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.actPrice * obj.count) + sum
            }, 0)
            localStorage.setItem('items', JSON.stringify(state.items))
            localStorage.setItem('priceCart', JSON.stringify(state.totalPrice))
            localStorage.setItem('totalPizzasCart', JSON.stringify(state.totalPizzas))
        },
        removeItem(state:IinitialState, action){
            state.items = state.items.filter((obj) => {
                const value = obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size
                if(!value){
                    return obj
                } else{
                    state.totalPizzas = +state.totalPizzas - obj.count
                    state.totalPrice = +state.totalPrice - obj.count*obj.actPrice
                }
            })
            localStorage.setItem('items', JSON.stringify(state.items))
            localStorage.setItem('priceCart', JSON.stringify(state.totalPrice))
            localStorage.setItem('totalPizzasCart', JSON.stringify(state.totalPizzas))
        },
        removeCount(state:IinitialState,action){
            const findItem = state.items.find(obj => obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size)
            if(findItem)
            --findItem.count
            if(findItem.count == 0){
                state.items = state.items.filter(obj => obj.count != 0)
            }
            state.totalPizzas = +state.totalPizzas - 1
            state.totalPrice = +state.totalPrice - +findItem.actPrice
            localStorage.setItem('items', JSON.stringify(state.items))
            localStorage.setItem('priceCart', JSON.stringify(state.totalPrice))
            localStorage.setItem('totalPizzasCart', JSON.stringify(state.totalPizzas))
        },
        addCount(state:IinitialState,action){
            const findItem = state.items.find(obj => obj.id == action.payload.id && obj.typeItem == action.payload.type && obj.sizeItem == action.payload.size)
            if(findItem)
            ++findItem.count
            state.totalPizzas = +state.totalPizzas + 1
            state.totalPrice = +findItem.actPrice + +state.totalPrice
            localStorage.setItem('items', JSON.stringify(state.items))
            localStorage.setItem('priceCart', JSON.stringify(state.totalPrice))
            localStorage.setItem('totalPizzasCart', JSON.stringify(state.totalPizzas))
        },
        clearItems(state:IinitialState){
            state.items = []
            state.totalPrice = 0
            state.totalPizzas = 0
            localStorage.clear()
        },
    }
})

export const {addItem, removeItem, removeCount,addCount ,clearItems} = cartSlice.actions

export default cartSlice.reducer