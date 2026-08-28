import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"



function Cart() {

    const [carts, setCarts] = useState([])



    useEffect(() => {
        let newBooks = JSON.parse(localStorage.getItem("books")) || []
        setCarts(newBooks)
    }, [])

    const handleDelete = (id)=>{
      
      let newBooks = carts.filter((cart) => cart.id !== id)
      localStorage.setItem("books",  JSON.stringify(newBooks))
      toast.success("deleted book successfully")


    }



    return (
        <div className="py-28 ">
            <ToastContainer />

            <div className="
        max-w-7xl mx-auto
        mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">

                {carts.map((cart) => (
                    <div key={cart.id}> 
                    <img
                        className="h-72 w-full"
                        src={cart.image} alt="" />

                   <button
                   onClick={()=> handleDelete(cart.id)} 
                   className="w-full py-3 mt-3 text-white bg-blue-700 border-none rounded-md">Delete</button> 
                   </div>    
                ))}

            </div>

        </div>
    )
}

export default Cart