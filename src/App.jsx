import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login, logout } from './store/authSlice'
import './App.css'
import { Footer } from './components'
import { Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log("Appwrite service :: getCurrentUser :: error", error)
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  })


  return !loading ? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block '>
          <Header />
            <main className="flex-grow">
              <Outlet />
            </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <div className="App">
      <header className="App-header "> 
        <h1 className="text-3xl bg-gray-500 py-8 text-center">Blog Site</h1>
        <br />
        <p className="text-xl text-center">Loading...</p>
        
        <p className="text-xl text-center">Please wait while we load the application.</p>
      </header>
    </div>
  )
}
export default App
