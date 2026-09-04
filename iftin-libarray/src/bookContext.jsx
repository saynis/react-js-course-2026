import { createContext, useEffect, useReducer } from "react";
import bookReducer, {intialData} from "./bookReducer";
import { toast } from "react-toastify";

export const bookContext = createContext()

const BookProvider = ({children})=>{

 const [state, dispatch]  = useReducer(bookReducer, intialData)


 useEffect(()=>{
    localStorage.setItem("books" , JSON.stringify({books: state.books}))

 })

// add to cart
 const addToCart = (book)=>{
    
    const bookIndex = state.books.findIndex(b => b.id === book.id)

    let updateBooks = [...state.books]

    if(bookIndex  !== -1){
        toast.error("book already in cart")
        return
    }else{
         updateBooks = [
            ...updateBooks,
             book
         ]
    }


    dispatch({
        type: "ADD_TO_CART",
        payload:{
            books: updateBooks
        }
    })


    toast.success("book added")

 }


//  removeCart 
const removeCart = (id)=>{

let newBooks = state.books.filter(b => b.id !== id)

dispatch({
    type: "REMOVE_CART",
    payload:{
        books: newBooks
    }
})


toast.success("deleted book in the cart")

}


const value = {
    books: state.books,
    addToCart,
    removeCart
}


return(
    <bookContext.Provider value={value}>
       {children}
    </bookContext.Provider>
)

}



export default BookProvider

