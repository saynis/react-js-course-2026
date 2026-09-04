 import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookContent from "./BookContent"
import { bookContext } from '../../bookContext';


function BookDetail() {

    const [loading, setLoading] = useState(false)
    const [book , setBook] = useState({})

   
    const {id} = useParams()
    const navigate = useNavigate()


    const {addToCart} = useContext(bookContext)






  
    const getBook = async()=>{

        setLoading(true)

        try {
            const response = await axios(`https://jju.saynis.store/api/books/${id}`)

            setBook(response.data.book)
            
        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(()=>{
     getBook()
    })

    const handleDelete =(id)=>{
 
        const response = axios.delete(`https://jju.saynis.store/api/books/${id}`)
        console.log(response)
        toast.success("book deleted successfully")

        setTimeout(() => {
            navigate("/books")
        },2000);



    }

  




  return (
    <div className="py-24">
        <ToastContainer />
        <div className="max-w-7xl mx-auto mt-8 ">
             
            <div className="md:flex md:gap-20 gap-12 bg-white shadow-md rounded-md  md:py-8 py-4 md:px-4 px-2">
                  
               {/* image */}
               <div className="md:w-1/4 w-full">
                  <img  className="h-72 mb-2 w-full" src={book.image} alt=""  />

                  <button
                  onClick={()=> addToCart(book)}
                   className="w-full py-2 border-none rounded-md bg-blue-700
                  text-white mb-2
                  ">Add to cart</button>

                   <button onClick={ ()=> handleDelete(book.id)} className="w-full py-2 border-none rounded-md bg-[#E3DCC4]
                  text-gray-700 mb-2
                  ">Delete</button>


               </div>


               <BookContent  book={book}/>
                  
            </div>

        </div>
        
        </div>
  )
}

export default BookDetail