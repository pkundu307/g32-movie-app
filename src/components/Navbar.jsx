import {NavLink} from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const Navbar = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>

<nav className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop:blur border-b border-natural-200 dark:border-natural-800">
<div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">

  <span className='font-semibold text-lg'> Movie Mania</span>
</div>
<NavLink to={"/"}>Home</NavLink>
<NavLink to={"/profile"}>Profile</NavLink>

</nav>
      
    </div>
  )
}

export default Navbar
