import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[20%] min-h-screen border-r-1'>
        <div className='flex flex-col gap-5 pt-6 pl-[15%] text-[15px]'>
            <NavLink to='/add' className='flex items-center gap-3 border border-red-500 border-r-0 rounded-l px-4 py-2'>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink to='/list' className='flex items-center gap-3 border border-red-500 border-r-0 rounded-l px-4 py-2'>
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block' >List Items</p>
            </NavLink>
          
        </div>
    </div>
  )
}

export default Sidebar