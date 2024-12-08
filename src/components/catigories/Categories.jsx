import React from "react"

function Categories(){
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
                            <li key={i} onClick={() => SelectCategory(i)} className={(selectCategory == i) ? 'active' : ''}>{item}</li>
                        )
                    })
                }
              </ul>
            </div>
        </>
    )
}
export default Categories