import React, {useState} from 'react'
import './appFromOriginal.css'
import './App.scss'
import './_fonts.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Categories from './components/catigories/Categories'
import Sort from './components/sort/Sort'
import PizzaBlock from './components/pizzaBlock/index'
import Skeleton from './components/pizzaBlock/skeleton'
import AdapterToPizzas from './components/pizzaBlock/AdapterToPizzas'
import Cart from './components/cart'
import EmptyPage from './components/emptyPage'

// export const context = React.createContext()


function App() {
  // let [isLoading, setIsLoading] = React.useState(true)
  // let [items, setItems] = React.useState([])
  // let pizzas
  // React.useEffect((() => {
  //   pizzas = fetch("https://6755b80511ce847c992af30a.mockapi.io/pizzas")
  //   .then(res => res.json())
  //   .then(json => {
  //     setItems(
  //       items = json
  //     )
  //     setIsLoading(!isLoading)
  //   })
  // }),[])
  return (
    <BrowserRouter>
     <div className="wrapper">
      <Header />
      {/* <context.Provider value={[isLoading,items]}> */}
        <Routes>
          <Route path='/' element={<AdapterToPizzas/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='*' element={<EmptyPage/>}/>
        </Routes>
      {/* </context.Provider> */}
    </div>
    </BrowserRouter>
  )
}

export default App