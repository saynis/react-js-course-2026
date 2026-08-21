import { useEffect, useState } from "react"
import BooksHeader from "../components/books/BooksHeader"
import axios from "axios"
import DisplayBook from "../components/books/DisplayBook"

function Books() {
 
  const [loading, setLoading] = useState(false)
  const [books , setBooks]= useState([])

   const getBooks = async()=>{

    setLoading(true)
    try {

      const response =  await axios("https://jju.saynis.store/api/books")
      setBooks(response.data.books)
      
    } catch (error) {
    console.log(error)
    }
  }

  useEffect(()=>{
       getBooks()
  },[])

 

  return (
    <div className="py-18">
      <BooksHeader />
       
       <div className="bg-[#E3DCC4]">
           
              <div className="max-w-7xl mx-auto py-8 ">

          {/* grid */}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              
            {books.map((book)=>(
              <DisplayBook key={book.id} book={book} />
            ))}

          </div>

      </div>

         </div>

   

    </div>
  )
}

export default Books