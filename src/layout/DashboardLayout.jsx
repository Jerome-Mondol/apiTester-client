import React from 'react'
import { Sidebar } from '../components/Dashboard/Sidebar'
import Dashboard from '../pages/Dashboard'

const DashboardLayout = () => {
  return (
    <>
        <div className='grid grid-cols-6 bg-stone-900 h-screen' >  
                {/* Left sidebar */}
                <div className='' >
                    <Sidebar />
                </ div>



                {/* Middle part (req, res etc) */}
                <div className='col-span-4 ' >
                    <Dashboard />
                </div>



                {/* Right Sidebar */}
                <div></div>
        </div> 
    </>
  )
}

export default DashboardLayout
