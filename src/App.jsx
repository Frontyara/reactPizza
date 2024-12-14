import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./appFromOriginal.css";
import "./App.scss";
import "./_fonts.scss";

import Header from "./components/header/Header";
import Categories from "./components/catigories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/index";
import Skeleton from "./components/pizzaBlock/skeleton";
import AdapterToPizzas from "./components/pizzaBlock/AdapterToPizzas";
import Cart from "./components/cart";
import EmptyPage from "./components/emptyPage";

export const context = React.createContext();

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  let [items, setItems] = React.useState([]);
  let [sortApi, setSortApi] = React.useState("");
  const [categoryApi, setCategoryApi] = React.useState("");
  const [searchApi, setSearchApi] = React.useState("");
  let pizzas;
  let categories = {
    sort: {
      getSort: sortApi,
      setSort: setSortApi,
    },
    category: {
      getCategory: categoryApi,
      setCategory: setCategoryApi,
    },
  };
  React.useEffect(() => {
    pizzas = fetch(
      `https://6755b80511ce847c992af30a.mockapi.io/pizzas?${
        categoryApi == 0 ? "" : `category=${categoryApi}`
      }${ !!searchApi ? `&search=${searchApi}` : ""}${
        sortApi == 0 ? '&sortBy=rating&order=asc' : 
        sortApi == 1 ? '&sortBy=rating&order=desc' : 
        sortApi == 2 ? '&sortBy=price&order=asc' :
        sortApi == 3 ? '&sortBy=price&order=desc' :
        sortApi == 4 ? '&sortBy=name&order=asc' : '&sortBy=name&order=desc'
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(true);
        setItems((items = json));
        setIsLoading(false);
      })
    window.scrollTo(0,0)
  }, [categoryApi, searchApi,sortApi]);
  return (
    <BrowserRouter>
      <context.Provider
        value={[isLoading, items, pizzas, categories, searchApi, setSearchApi]}
      >
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<AdapterToPizzas />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<EmptyPage />} />
          </Routes>
        </div>
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
