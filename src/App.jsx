import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './Pages/Add';
import List from './Pages/List';
import Login from './components/Login';
  import { ToastContainer} from 'react-toastify';




export const  backend_url = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"");
  useEffect(()=>{
    localStorage.setItem('token',token)
  })

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
     {
        token === "" ?
          <Login setToken={setToken} /> :
          (
            <>
              <Navbar setToken={setToken} />
              <hr />
              <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] text-gray-600 text-base'>
                  <Routes>

                    <Route path='/add' element={<Add token={token}/>} />
                    <Route path='/list' element={<List token={token} />} />
                  </Routes>
                </div>

              </div>
            </>
          )

      }
    </div>
  );
};

    
export default App;
