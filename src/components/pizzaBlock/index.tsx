import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

type PizzaBLockProps = {
  id:number;
  imageUrl:string;
  name:string;
  types:number[];
  sizes:number[];
  price:number;
  strurcture:string;
}

function PizzaBlock({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
  structure,
}) {
  const dispatch = useDispatch();
  const [actPrice, setActPrice] = React.useState(price)
  // console.log(selectCount)
  const wordTypes = ["тонкое", "традиционная"];
  let [typeItem, setTypeItem] = React.useState(wordTypes[0]);
  let [sizeItem, setSizeItem] = React.useState(sizes[0]);
  let itemForRedux = {
    id,
    imageUrl,
    name,
    actPrice,
    typeItem,
    sizeItem,
    count: 0,
  };
  const count = useSelector((state:{cartReducer:{items}}) =>
    state.cartReducer.items.find(
      (obj) =>
        obj.id == id && obj.typeItem == typeItem && obj.sizeItem == sizeItem
    )
  );
  const selectCount = count ? count.count : 0;
  const onClickCart = () => {
    dispatch(addItem(itemForRedux));
  };
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
  const [structureBool, setStructureBool] = React.useState(false);
  const shadowRef = React.useRef<HTMLDivElement>(null)
  const [shadowOpacity,setShadowOpacity] = React.useState(0)
  const [shadowBLockClass, setShadowBLockClass] = React.useState("shadowBlock")
  return (
    <>
      {structureBool && (
        <>
          <div className={shadowBLockClass} ref={shadowRef}></div>
        <div className="structureBlock">
          <div
            className="cross"
            onClick={() => {
              const body = document.body;
              body.style.overflow = "auto";
              setStructureBool(false);
              setShadowBLockClass('shadowBlock shadowBlock_false')
            }}
          >
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
          <img src={imageUrl} alt="" />
          <div className="structureBlock__info">
            <h2>{name}</h2>
            <div className="sizeType">
              {sizeItem} см, {typeItem}
            </div>
            <div className="structureBlock__structure">{structure}</div>
          </div>
        </div>
        </>
      )}
      <div className="pizza-block__wrapper">
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
            onClick={() => {
              const body = document.body;
              body.style.overflow = "hidden";
              setShadowBLockClass('shadowBlock')
              setStructureBool(true);
            }}
          />
          <h4 className="pizza-block__title">{name}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((item, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      reverseIndexTypes(i);
                      setTypeItem(wordTypes[item]);
                    }}
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
                    onClick={() => {
                      reverseIndexSizes(i);
                      setSizeItem(item);
                      if(item == 30){
                        setActPrice(prev => prev = (price * 1.43).toFixed(0))
                      } else if (item == 35){
                        setActPrice(prev => prev = (price * 1.73).toFixed(0))
                      } else{
                        setActPrice(price)
                      }
                    }}
                    className={indexSize == i ? "active" : ""}
                  >
                    {item}см
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{actPrice}₽</div>
            <button
              className="button button--outline button--add"
              onClick={() => {
                TakePizzaButton();
                onClickCart();
              }}
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
              {selectCount > 0 && <i>{selectCount}</i>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PizzaBlock;