import React from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/common/Footer'

const MainLayout = () => {
  return (
    <>
        <div className='w-full h-full' > 
            <Navbar /> 
            <Outlet />
            <Footer />
        </div>
    </>
  )
}

export default MainLayout
