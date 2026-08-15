import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Books from "./pages/Books"

function App() {
  return (
    <>
      
      <Header />     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books/>} />
      </Routes>
  
      <Footer />

    </>
  )
}

export default App