import React from "react";

import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/slices/filterSlice";

function Categories() {
  const dispatch = useDispatch();
  function onChangeCategory(i){
    dispatch(setCategory(i))
  };

  let [selectCategory, setSelectCategory] = React.useState(0);
  function SelectCategory(index) {
    setSelectCategory((selectCategory = index));
  }
  let categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((item, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  SelectCategory(i);
                  onChangeCategory(i);
                }}
                className={selectCategory == i ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Categories;
