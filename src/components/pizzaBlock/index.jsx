import React from "react";

function PizzaBlock({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
  category,
  rating,
}) {
  let wordTypes = ["тонкое", "традиционная"];
  let [indexType, setIndexType] = React.useState(0);
  let [indexSize, setIndexSize] = React.useState(0);
  function reverseIndexTypes(ind) {
    setIndexType((indexType = ind));
  }
  function reverseIndexSizes(ind) {
    setIndexSize((indexSize = ind));
  }
  let [takePizza, setTakePizza] = React.useState(0);
  function TakePizzaButton() {
    setTakePizza(++takePizza);
  }
  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => reverseIndexTypes(i)}
                  className={indexType == i ? "active" : ""}
                >
                  {wordTypes[item]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => reverseIndexSizes(i)}
                  className={indexSize == i ? "active" : ""}
                >
                  {item}см
                </li>
              );
            })}
            {/* <li className="active">26 см.</li>
      <li>30 см.</li>
      <li>40 см.</li> */}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price}₽</div>
          <button
            className="button button--outline button--add"
            onClick={TakePizzaButton}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{takePizza}</i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;
