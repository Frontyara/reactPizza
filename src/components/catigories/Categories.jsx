import React from "react"

import { context } from "../../App"

function Categories(){
    let contextForCategories = React.useContext(context)
    contextForCategories = contextForCategories[3]
    let categoryApi = contextForCategories.category.getCategory
    let setCategoryApi = contextForCategories.category.setCategory
    
    let [selectCategory, setSelectCategory] = React.useState(0)
    function SelectCategory(index){
        setSelectCategory(
            selectCategory = index
        )
    }
    let categories = ["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"]
    return(
        <>
        <div className="categories">
              <ul>
                {
                    categories.map((item,i) => {
                        return (
                            <li key={i} onClick={() => {
                                SelectCategory(i)
                                setCategoryApi(`${i}`)
                            }} className={(selectCategory == i) ? 'active' : ''}>{item}</li>
                        )
                    })
                }
              </ul>
            </div>
        </>
    )
}
export default Categories