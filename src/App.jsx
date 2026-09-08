
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {

  return (
   <>
   <div className="min-h-screen">
   <Navbar/>
   <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/profile' element={<Profile/>}/>

   </Routes>
</div>
   </>
  )
}

export default App
