import { Link } from "react-router-dom"


function Header() {
  return (
    <header className="flex justify-between bg-black py-1 px-8 fixed w-full">
    <h1 className="text-white">subeer</h1>
    <nav>
        <ul className="flex gap-4 text-white">
            <li>  <Link to="/"> Home </Link> </li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/contact">contact</Link></li>
              <li><Link to="/products">Products</Link></li>

        </ul>
    </nav>

    <div className="flex gap-2">
        <button className="py-1 px-6 bg-blue-600 rounded-md">Login</button>
        <button className="bg-white text-blue-600 py-1 px-6 rounded-md">Get started</button>
    </div>
    </header>
  )
}

export default Header