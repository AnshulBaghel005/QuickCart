
import './App.css'
import { Routes,Route } from 'react-router'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'

function App() {
  

  return (
    <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/place-order" element={<PlaceOrder/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="*" element={<div>No page found</div>} />

        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
        {/* Example: <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      </div>
    </>
  )
}

export default App
