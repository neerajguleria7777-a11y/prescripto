import { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/exportAppContext';

const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { user, fetchLogout } = useContext(AppContext);
  const [openDropdown, setOpenDropodown] = useState(false);
  
  const adminUrl = 'https://prescripto-2njz.vercel.app';

  return (
    <div className='flex items-center justify-between text-sm py-3 mb-5 border-b border-b-gray-200 backdrop-blur-sm sticky top-0 bg-white/80 z-50 shadow-sm' >
      <NavLink to={'/'} className='flex items-center gap-2'>
        <img className='w-40 lg:w-48 cursor-pointer hover:scale-105 transition-transform duration-300' src={assets.logo} alt="" />
      </NavLink>
      <ul className='hidden md:flex items-start gap-6 lg:gap-8 font-medium text-sm'>
        <NavLink className='relative group' to={'/'}>
          <li className='py-1 hover:text-[#5f6FFF] transition-colors duration-300' >HOME</li>
          <hr className='w-0 group-hover:w-full border-t-2 border-[#5f6FFF] m-auto transition-all duration-300 hidden' />
        </NavLink>
        <NavLink className='relative group' to={'/doctors'}>
          <li className='py-1 hover:text-[#5f6FFF] transition-colors duration-300' >ALL DOCTORS</li>
          <hr className='w-0 group-hover:w-full border-t-2 border-[#5f6FFF] m-auto transition-all duration-300 hidden' />
        </NavLink>
        <NavLink className='relative group' to={'/about'}>
          <li className='py-1 hover:text-[#5f6FFF] transition-colors duration-300' >ABOUT</li>
          <hr className='w-0 group-hover:w-full border-t-2 border-[#5f6FFF] m-auto transition-all duration-300 hidden' />
        </NavLink>
        <NavLink className='relative group' to={'/contact'}>
          <li className='py-1 hover:text-[#5f6FFF] transition-colors duration-300' >CONTACT</li>
          <hr className='w-0 group-hover:w-full border-t-2 border-[#5f6FFF] m-auto transition-all duration-300 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-3'>
        <button 
          onClick={() => window.open(adminUrl, '_blank')} 
          className='hidden md:block py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm'
        >
          Admin
        </button>
        {
          user ?
            <>
              <div onClick={() => setOpenDropodown((prev) => !prev)} className='hidden md:flex items-center gap-2 cursor-pointer group relative'>
                <div className='relative'>
                  <img className='w-10 h-10 rounded-full object-cover border-2 border-[#5f6FFF] hover:scale-110 transition-transform duration-300' src={user ? user?.image : assets.profile_pic} alt='profile-pic' />
                  <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                <img className='w-2.5 group-hover:rotate-180 transition-transform duration-300' src={assets.dropdown_icon} alt='dropdown-icon' />
                <div className={`absolute top-0 right-0 pt-14 w-35 text-base font-medium text-gray-600 z-20 transition-all duration-300 ${openDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className='min-w-48 bg-white rounded-xl shadow-2xl flex flex-col gap-2 p-4 border border-gray-100'>
                    <p onClick={() => navigate('my-profile')} className='hover:bg-[#5f6FFF] hover:text-white cursor-pointer px-4 py-2 rounded-lg transition-all duration-300'>My Profile</p>
                    <p onClick={() => navigate('my-appointments')} className='hover:bg-[#5f6FFF] hover:text-white cursor-pointer px-4 py-2 rounded-lg transition-all duration-300'>My Appointments</p>
                    <hr className='border-gray-200'/>
                    <p onClick={() => fetchLogout()} className='hover:bg-red-500 hover:text-white cursor-pointer px-4 py-2 rounded-lg transition-all duration-300'>Logout</p>
                  </div>
                </div>
              </div>
              <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='w-6 cursor-pointer md:hidden hover:scale-110 transition-transform duration-300' alt="" />
            </>
            : 
            <>
              <button onClick={() => navigate('/login')} className='hidden md:block py-2 px-6 bg-gradient-to-r from-[#5f6FFF] to-[#7a88ff] text-white rounded-full font-medium cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm'>Login</button>
              <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='w-6 cursor-pointer md:hidden hover:scale-110 transition-transform duration-300' alt="" />
            </>
        }

        {/* Mobile Menu  */}
        <div className={`${showMenu ? 'fixed w-full h-full' : 'hidden'} sm:hidden right-0 top-0 bottom-0 z-[9999] bg-white`} >
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-200'>
            <img className='w-44' src={assets.logo} alt="" />
            <img className='w-7 hover:rotate-90 transition-transform duration-300 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 pb-10 text-lg font-medium w-full'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>HOME</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>ALL DOCTORS</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>ABOUT</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>CONTACT</p> </NavLink>
            <button onClick={() => { window.open(adminUrl, '_blank'); setShowMenu(false); }} className='w-full px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300'>ADMIN PANEL</button>
            {user ? (
              <>
                <NavLink onClick={() => setShowMenu(false)} to='/my-profile' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>MY PROFILE</p> </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/my-appointments' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>MY APPOINTMENTS</p> </NavLink>
                <button onClick={() => { fetchLogout(); setShowMenu(false); }} className='w-full px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300'>LOGOUT</button>
              </>
            ) : (
              <NavLink onClick={() => setShowMenu(false)} to='/login' className='w-full'> <p className='px-4 py-3 rounded-lg bg-[#5f6FFF] text-white hover:bg-[#4a5ae8] transition-all duration-300 text-center'>LOGIN / SIGN UP</p> </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
