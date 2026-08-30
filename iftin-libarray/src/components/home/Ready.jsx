import { useContext } from "react"
import { UserContext } from "../../UserContext"


function Ready() {
  const {user} = useContext(UserContext)
  return (
    <div className="max-w-7xl mx-auto mt-8">

        <div className="text-center py-16 bg-white shadow-md border border-gray-300">
              <h3 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4 ">Ready to explore our library {user}</h3>
              <button className="py-2 px-8 bg-[#2A7EFF] rounded-md text-white">Get started</button>
        </div>

    </div>
  )
}

export default Ready