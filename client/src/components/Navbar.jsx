import { NavLink } from 'react-router-dom'
import '../App.css'

function Navbar() {
  return (
    <header className="gum-nav">
      <div className="gum-nav-left">
        <div className="gum-logo">
          <span className="gum-logo-main">MindStack</span>
        </div>
      </div>

      <nav className="gum-nav-center">
        {/* <NavLink to="/" end>
          Home
        </NavLink> */}
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="gum-nav-right">
        <NavLink to="/login">
          Log in
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar

