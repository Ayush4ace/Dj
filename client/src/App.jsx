
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from "./components/auth/Signup"
import Home from './components/Home'

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <Home/>
  }
])

function App() {
  

  return (
    <div>
      <RouterProvider router = {appRouter}/>
    
    </div>
      
  )
}

export default App
