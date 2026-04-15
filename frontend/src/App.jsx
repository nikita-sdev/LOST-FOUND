
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

//local
import Login from './components/login';
import Signup from './components/signup';
import Logout from './components/logout';
import Navbar from './components/navbar';
import Home from './components/home';

function App() {

  const [token, setToken]= useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
    {token && <Navbar></Navbar>}
    <Routes>
      <Route path='/' element={token?<Navigate to= '/home'></Navigate>:<Navigate to='/login'></Navigate>}></Route>
      <Route path='/login' element={!token ?<Login setToken={setToken}></Login>: <Navigate to="/home"></Navigate>}></Route>

      <Route path='/signup' element={!token?<Signup></Signup>:<Navigate to='/home'></Navigate>}></Route>

      <Route path='/logout' element={token?<Logout setToken={setToken}></Logout>:<Navigate to= "/login"></Navigate>}></Route>

      <Route path='/home' element={token?<Home></Home>:<Navigate to= "/login"></Navigate>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
