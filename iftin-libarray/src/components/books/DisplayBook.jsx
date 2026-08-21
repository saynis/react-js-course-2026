import { Link } from "react-router-dom"


function DisplayBook({book}) {
  return (
    <div className="bg-white p-2 rounded-md border border-gray-400 shadow-md ">
        <img 
        className="w-full h-72"
        src={book.image}
         alt="" />

         <Link to={`/books/${book.id}`} >
          <button className="py-1 mt-4  w-full bg-blue-700 rounded-md border-none text-white">Read more</button>
         </Link>
    </div>
  )
}

export default DisplayBook