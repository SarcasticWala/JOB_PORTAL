import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state) => state.profile.user)
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [user])

  return (
    <>
      <nav className=' w-full bg-[#f4f4f4] flex justify-around items-center p-3 text-lg font-medium fixed z-50 top-0 border-b border-gray-400'>
        <NavLink className=' text-3xl font-bold text-[#00a264] cursor-pointer' to="/">JobPro</NavLink>
        <div className=' flex items-center gap-x-4'>
          <NavLink className={(e) => { return e.isActive ? "border-b-4 border-b-[#00a264] text-[#00a264]" : "" }} to="/">Home</NavLink>
          <NavLink className={(e) => { return e.isActive ? "border-b-4 border-b-[#00a264] text-[#00a264]" : "" }} to="/jobs">Jobs</NavLink>
          <NavLink className={(e) => { return e.isActive ? "border-b-4 border-b-[#00a264] text-[#00a264]" : "" }} to="/about">About Us</NavLink>
          <NavLink className={(e) => { return e.isActive ? "border-b-4 border-b-[#00a264] text-[#00a264]" : "" }} to="/contact">Contact Us</NavLink>
        </div>
        {user?<img onClick={()=>{navigate("/myprofile")}} className=' w-9 rounded-full cursor-pointer' src={user.image} alt="profile" />
        :
        <Link className=' bg-[#4cd681] px-4 py-1 rounded-md font-medium hover:bg-[#4cd681d1] hover:text-[#000000b0] ' to="/signup">Sign Up</Link>
        }
      </nav>
      <Outlet />  {/* This will render the child routes */}
    </>
  )
}

export default Navbar