import { NavLink } from "react-router-dom"

import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
        <NavLink to={'/'}> Home</NavLink>
        <NavLink to={'/Tarefas'}>Tarefas</NavLink>
        <NavLink to={'/CadCaixas'}>Caixas</NavLink>
    </nav>
  )
}

export default Navbar