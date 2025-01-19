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
import { getPizzasItems } from "./redux/slices/pizzasItemsFromBack";

const anyElem: any = 0;
export const context = React.createContext(anyElem);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: any) => state.filterReducer.category);
  const sortId = useSelector((state: any) => state.filterReducer.sort);
  const items = useSelector((state: any) => state.pizzasReducer.pizzasItems);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const query = async () => {
      setIsLoading(true);
      await dispatch<any>(getPizzasItems({ categoryId, sortId }));
      setIsLoading(false);
      window.scrollTo(0, 0);
    };
    query();
  }, [sortId, categoryId]);
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
};

export default App;
