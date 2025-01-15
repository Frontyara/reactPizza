import React from "react";
import { Routes, Route } from "react-router-dom";

import "./appFromOriginal.css";
import "./App.scss";
import "./_fonts.scss";

import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header/Header";
import AdapterToPizzas from "./components/pizzaBlock/AdapterToPizzas";
import Cart from "./components/cart";
import EmptyPage from "./components/emptyPage";
// import { getPizzas } from "./redux/slices/pizzasItemsFrom Back";
import { asyncGetPizzas } from "./redux/slices/pizzasItemsFrom Back";

// eslint-disable-next-line react-refresh/only-export-components
let anyElem: any = 0
export const context = React.createContext(anyElem);

function App() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: any) => state.filterReducer.category);
  const searchRedux = useSelector((state: any) => state.filterReducer.search);
  const sortId = useSelector((state: any) => state.filterReducer.sort);
  const items = useSelector((state: any) => state.pizzasReducer.pizzasItems);
  const [isLoading, setIsLoading] = React.useState(true);

  async function getPizzas(){
    await dispatch<any>(asyncGetPizzas({ categoryId, sortId }));
    setIsLoading(false);
    window.scrollTo(0, 0);
  }
  React.useEffect(() => {
    getPizzas()
  }, [searchRedux, sortId, categoryId ]);
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
