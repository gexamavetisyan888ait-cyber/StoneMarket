import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Designers from './pages/Designers';
import About from './pages/About';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
