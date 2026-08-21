import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function BookDetail() {

    const [loading, setLoading] = useState(false)
    const [book , setBook] = useState({})

    const {id} = useParams()


  


  
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


  return (
    <div className="py-24">

       <h1>{book.title}</h1>
        
        </div>
  )
}

export default BookDetail