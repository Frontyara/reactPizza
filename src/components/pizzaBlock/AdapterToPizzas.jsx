import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Categories from "../catigories/Categories";
import Sort from "../sort/Sort";
import PizzaBlock from "../pizzaBlock/index";
import Skeleton from "../pizzaBlock/skeleton";
// import { context } from '../../App'
//124timerStrattimerEndSuccess
import { context } from "../../App";

function AdapterToPizzas() {
  let contextForPizzasBlock = React.useContext({...context})
  let isLoading = contextForPizzasBlock[0]
  let items = contextForPizzasBlock[1]
  window.scrollTo(0,0)
  return (
    <div className="adapterWrapper">
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(8)].map((_, index) => (
                  <Skeleton key={index}></Skeleton>
                ))
              : items.map((item) => {
                  return <PizzaBlock key={item.id} {...item} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdapterToPizzas