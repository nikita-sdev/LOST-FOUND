
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

//local
import Login from './components/login';
import Signup from './components/signup';
import Logout from './components/logout';
import Navbar from './components/navbar';
import Home from './components/home';
import AddItem from './components/addItem';
import ItemDetails from './components/itemDetails';
import Verify from './components/verify';
import DashBoard from './components/dashBoard';

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
      <Route path='/add-post' element={token?<AddItem></AddItem>:<Navigate to= "/login"></Navigate>}></Route>

      <Route path='/item/:id' element={token?<ItemDetails></ItemDetails>:<Navigate to= "/login"></Navigate>}></Route>

      <Route path='/verify/:id' element={token?<Verify></Verify>:<Navigate to= "/login"></Navigate>}></Route>

      <Route path='/dashboard' element={token?<DashBoard></DashBoard>:<Navigate to= "/login"></Navigate>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
