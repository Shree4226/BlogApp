import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// CHANGED: Import from the new services folder
import authService from './services/auth' 
import { login, logout } from './store/authSlice'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      // In MERN, the user object is usually inside response.data or just returned directly
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
       // Quiet failure is okay here (user just isn't logged in)
       console.log("App :: getCurrentUser :: error", error);
       dispatch(logout());
    })
    .finally(() => setLoading(false))
  }, []) // Added dependency array to run only once

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
     // ... (Your loading UI remains the same)
     <div className="App">Loading...</div>
  )
}

export default App
