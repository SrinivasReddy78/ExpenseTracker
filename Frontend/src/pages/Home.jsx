import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const Home = () => {
    return (
        <div className='w-full h-full flex gap-6 p-6 font-Nunito bg-[#e7cbcf]'>
            <div className="w-1/5 border-white bg-[#F5EEF0] rounded-xl">
                <SideBar />
            </div>
            <div className="w-4/5 flex items-center justify-center border-2 border-white bg-[#F5EEF0] rounded-xl overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Home
