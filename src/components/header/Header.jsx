import { NavLink } from 'react-router-dom'
import React from 'react'
import Logo from '../../../reactLogo.svg'
import Search from './assets/iconsSearch.svg'
import Delete from './assets/iconClose.svg'
import { useDispatch } from 'react-redux'
import { setSearchRedux } from '../../redux/slices/filterSlice'

function Header(){
  const dispatch = useDispatch()
  function setSearchFunc(item){
    dispatch(setSearchRedux(item))
  }

  let randomWord = []
  randomWord[0] = setRandomWord()
  randomWord[1] = setRandomWord()
  function setRandomWord(){
    let arr = ['четыре сезона','чизбургер-пицца','пепперони','маргарита']
    let rand = 0 + Math.random() * (3);
    return arr[Math.floor(rand)]
  } 
  let [inputValue,setInputValue] = React.useState('')
    return(
        <header className="header">
        <div className="container">
          <NavLink to='/' className="header__logo">
            <img width="58" src={Logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </NavLink>
          <div className="inputBlock">
            <div className="search"><img src={Search} alt="" /></div>
            <input type="seacrh" 
            value={inputValue} 
            placeholder={randomWord[Math.random().toFixed(0)]} 
            onChange={(event) => {
              setInputValue(event.target.value)
              setSearchFunc(event.target.value)
              }}/>
            {inputValue && <div className="delete"><img src={Delete} alt="" onClick={() => {
              setSearchFunc('')
              setInputValue( inputValue = '')
            }}/></div>}
          </div>
          <NavLink to={'/cart'} className="header__cart">
            <a href="/cart.html" className="button button--cart">
              <span>520 ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>3</span>
            </a>
          </NavLink>
        </div>
      </header>
    )
}
export default Header