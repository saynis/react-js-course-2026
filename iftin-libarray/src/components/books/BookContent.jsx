import { useContext } from "react"
import { UserContext } from "../../UserContext"


function BookContent({book}) {
  const {user} = useContext(UserContext)
 
  return (
    <div className="w-full">
        {/* buttons */}
        <div className="flex space-x-28 shadow-md shadow-gray-400 w-full p-3 rounded-md">
            <button className="">Overview</button>
            <button className="">edition</button>
            <button className="">Details</button>
            <button className="">List</button>
            <button className="">Related books</button>
        </div>

        {/* boook data */}
        <div className="mt-4 p-3">
            <span className="font-bold text-2xl">Tittle:</span>  <h2 className="font-semibold text-gray-700 md:text-3xl text-xl">{book.title}</h2>
            <p className="mt-2 mb-8">{book.description}</p>
            <span className=" font-bold text-xl">Author</span>
             <p className="font-semibold text-3xl">   {book.author}</p>
             <p>posted by {user}</p>
        </div>
    </div>
  )
}

export default BookContent