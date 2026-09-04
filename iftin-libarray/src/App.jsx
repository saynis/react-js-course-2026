import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Books from "./pages/Books"
import BookDetail from "./components/books/BookDetail"
import Addbook from "./components/books/Addbook"
import Cart from "./components/books/Cart"
import { AuthProvider } from "./UserContext"
import BookProvider from "./bookContext"




function App() {

  

  return (
    <>
     <BookProvider> 
       <AuthProvider> 
      <Header  />     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books/>} />

        <Route path="/books/:id" element={<BookDetail />} />

        <Route path="/books/new" element={<Addbook />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  
      <Footer />

      </AuthProvider>
      </BookProvider>
    
      

    </>
  )
}

export default App