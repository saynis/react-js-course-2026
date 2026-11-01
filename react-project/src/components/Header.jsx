import { Link } from "react-router-dom"

function Header() {
  return (
      <header className="bg-[#0D0E1E] fixed w-full h-16 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-2xl">saynis</h1>
        <nav>
            <ul className="flex gap-8 text-xl">
                <li ><Link to="/">home</Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/contact">contact</Link></li>
            </ul>
        </nav>
        
        <button
        className="bg-[#6EE07F] py-2 px-6 border-none rounded-md"
        >hire me</button>
        </div>
       
    </header>
  )
}

export default Header