import { useState, useCallback, useContext, useEffect } from 'react'
import './appFromOriginal.css'
import './App.scss'
import './_fonts.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Categories from './components/catigories/Categories'
import Sort from './components/sort/Sort'
import PizzaBlock from './components/pizzaBlock/PizzaBlock'
import {pizzas} from '../Pizzas'


function App() {
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
            {pizzas.map(item => {
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
