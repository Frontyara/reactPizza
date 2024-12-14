import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./appFromOriginal.css";
import "./App.scss";
import "./_fonts.scss";

import { useSelector } from "react-redux";

import Header from "./components/header/Header";
import AdapterToPizzas from "./components/pizzaBlock/AdapterToPizzas";
import Cart from "./components/cart";
import EmptyPage from "./components/emptyPage";

export const context = React.createContext();

function App() {
  const searchRedux = useSelector((state) => state.filterReducer.search);
  const categoryId = useSelector((state) => state.filterReducer.category);
  const sortId = useSelector((state) => state.filterReducer.sort);

  const [isLoading, setIsLoading] = React.useState(true);
  let [items, setItems] = React.useState([]);
  let pizzas;
  React.useEffect(() => {
    pizzas = fetch(
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
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(true);
        setItems((items = json));
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [searchRedux, sortId, categoryId]);
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
