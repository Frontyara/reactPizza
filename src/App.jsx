import React from 'react'
import './appFromOriginal.css'
import './App.scss'
import './_fonts.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Categories from './components/catigories/Categories'
import Sort from './components/sort/Sort'
import PizzaBlock from './components/pizzaBlock/index'
import Skeleton from './components/pizzaBlock/skeleton'

function App() {
  let [isLoading, setIsLoading] = React.useState(true)
  let [items, setItems] = React.useState([])
  let pizzas
  React.useEffect((() => {
    pizzas = fetch("https://6755b80511ce847c992af30a.mockapi.io/pizzas")
    .then(res => res.json())
    .then(json => {
      setItems(
        items = json
      )
      setIsLoading(!isLoading)
    })
  }),[])
  return (
    <BrowserRouter>
     <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading ? [...new Array(8)].map((_,index) => <Skeleton key={index}></Skeleton>) :
            items.map(item => {
              return (
                <PizzaBlock key={item.id} {...item} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
