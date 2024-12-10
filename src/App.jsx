import React, { useState } from "react";
import "./appFromOriginal.css";
import "./App.scss";
import "./_fonts.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Categories from "./components/catigories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/index";
import Skeleton from "./components/pizzaBlock/skeleton";
import AdapterToPizzas from "./components/pizzaBlock/AdapterToPizzas";
import Cart from "./components/cart";
import EmptyPage from "./components/emptyPage";

// export const context = React.createContext()

export const context = React.createContext();

function App() {
  let [isLoading, setIsLoading] = React.useState(true);
  let [items, setItems] = React.useState([]);
  let [sortApi, setSortApi] = React.useState("");
  let [categoryApi, setCategoryApi] = React.useState("");
  let [searchApi, setSearchApi] = React.useState("");
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
      }&search=${searchApi ? searchApi : ""}`
    )
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(true);
        setItems((items = json));
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryApi, searchApi]);
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
