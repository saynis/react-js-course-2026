import { useContext, } from "react"
import { ToastContainer, } from "react-toastify"
import { bookContext } from "../../bookContext"



function Cart() {

  

const {books, removeCart} = useContext(bookContext)

   

  



    return (
        <div className="py-28 ">
            <ToastContainer />

            <div className="
        max-w-7xl mx-auto
        mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">

                {books.map((book) => (
                    <div key={book.id}> 
                    <img
                        className="h-72 w-full"
                        src={book.image} alt="" />

                   <button
                   onClick={()=> removeCart(book.id)}
                   className="w-full py-3 mt-3
                    text-white bg-blue-700 border-none 
                    rounded-md">Delete</button> 
                   </div>    
                ))}

            </div>

        </div>
    )
}

export default Cart