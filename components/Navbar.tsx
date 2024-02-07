import React from 'react'
import { PiAirplaneFill } from "react-icons/pi";
const Navbar = () => {
  return (
    <div className='flex items-start relative   bg-blue-500 justify-between  px-5 p-3'>
        <div className='flex gap-2 items-center'>
        <PiAirplaneFill size={27}  color='white'/>
            <a href='/'  className='font-bold cursor-pointer  text-white text-3xl'>Flywere</a>
        </div>  
    </div>
  )
}

export default Navbar
