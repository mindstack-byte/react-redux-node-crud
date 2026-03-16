import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
// import Home from './pages/Home'
import Todos from './pages/Todos'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Todos />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/todos" element={<Todos />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

