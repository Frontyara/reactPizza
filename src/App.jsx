import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios"

import "./appFromOriginal.css";
import "./App.scss";
import "./_fonts.scss";

import { useSelector,useDispatch } from "react-redux";

import Header from "./components/header/Header";
import AdapterToPizzas from "./components/pizzaBlock/AdapterToPizzas";
import Cart from "./components/cart";
import EmptyPage from "./components/emptyPage";
import { getPizzas } from "./redux/slices/pizzasItemsFrom Back";

export const context = React.createContext();

function App() {
  const dispatch = useDispatch()
  const categoryId = useSelector((state) => state.filterReducer.category);
  const searchRedux = useSelector((state) => state.filterReducer.search);
  const sortId = useSelector((state) => state.filterReducer.sort);
  const items = useSelector(state => state.pizzasReducer.pizzasItems)
  const [isLoading, setIsLoading] = React.useState(true);

  let pizzas;
  React.useEffect(() => {
    pizzas = axios.get(
      `https://6755b80511ce847c992af30a.mockapi.io/pizzas?${
        categoryId == 0 ? "" : `category=${categoryId}`
      }${!!searchRedux ? `&search=${searchRedux}` : ""}${
        sortId == 0
          ? "&sortBy=rating&order=asc"
          : sortId == 1
          ? "&sortBy=rating&order=desc"
          : sortId == 2
          ? "&sortBy=price&order=asc"
          : sortId == 3
          ? "&sortBy=price&order=desc"
          : sortId == 4
          ? "&sortBy=name&order=asc"
          : "&sortBy=name&order=desc"
      }`
    )
      .then((json) => {
        dispatch(getPizzas(json.data))
        setIsLoading(true);
        setIsLoading(false);
      })
      // .catch((error) => {
        // alert("Ошибка на стороне сервера")
        // setIsLoading(false)
        // console.log(error)
      // })
    window.scrollTo(0, 0);
  }, [searchRedux, sortId, categoryId]);
  return (
      <context.Provider value={[isLoading, items]}>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<AdapterToPizzas />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<EmptyPage />} />
          </Routes>
        </div>
      </context.Provider>
  );
}

export default App;
