import { Link } from "react-router-dom"
import { FaCartArrowDown } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "../UserContext";



function Header() {

  const {user} = useContext(UserContext)




  return (
    <header className="bg-[#E3DCC4]  fixed w-full py-4">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center">


          {/* logo */}
          <div>
            <img className="h-16" width={50} src="/jju.png" alt="logo.png" />
          </div>

          {/* naviagtion */}
          <nav className="flex">

            <ul className="flex gap-8 text-xl font-semibold text-gray-700">
              <li>
                <Link to="/" >Home</Link>
              </li>

               <li>
                <Link to="/books" >Books</Link>
              </li>

               <li>
                <Link to="/about" >About</Link>
              </li>

               <li>
                <Link to="/contact" >Contact</Link>
              </li>
            </ul>

          </nav>


          {/* buttons div */}

          <div className="flex gap-8 items-center">
            <button className="text-xl font-bold">Login</button>
            <button className="py-2 
            px-6 bg-[#2A7EFF] text-xl rounded-md text-white
            ">Sign up</button>

           <Link to="/cart"><FaCartArrowDown className="text-3xl text-[#2A73FF] cursor-pointer" /></Link> 
           <span>{user}</span>
          </div>

         
      
          
        </div>

      </div>

    </header>
  )
}

export default Header