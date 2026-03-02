import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* left  */}
        <div>
            <img className='mb-5 w-44 hover:scale-105 transition-transform duration-300' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-7 text-base'>Your trusted healthcare partner for convenient appointment booking and quality medical care. We connect you with the best doctors in your area.</p>
            <div className='flex gap-4 mt-6'>
                <div className='w-10 h-10 rounded-full bg-[#5f6FFF]/10 flex items-center justify-center hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer'>
                    <span className='text-xl'>👍</span>
                </div>
                <div className='w-10 h-10 rounded-full bg-[#5f6FFF]/10 flex items-center justify-center hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer'>
                    <span className='text-xl'>🐦</span>
                </div>
                <div className='w-10 h-10 rounded-full bg-[#5f6FFF]/10 flex items-center justify-center hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer'>
                    <span className='text-xl'>📷</span>
                </div>
            </div>
        </div>

        {/* middle  */}
        <div>
            <p className='text-xl font-bold mb-5 text-gray-800'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer'>
                    <Link to='/about'>About us</Link>
                </li>
                <li className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer'>
                    <Link to='/contact'>Contact us</Link>
                </li>
                <li className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer'>Privacy Policy</li>
            </ul>
        </div>

        {/* right  */}
        <div>
             <p className='text-xl font-bold mb-5 text-gray-800'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='flex items-center gap-2 hover:text-[#5f6FFF] transition-colors duration-300'>
                    <span>📞</span> +91 8091043893
                </li>
                <li className='flex items-center gap-2 hover:text-[#5f6FFF] transition-colors duration-300'>
                    <span>✉️</span> fastdoc@gmail.com
                </li>
                <li className='flex items-center gap-2 hover:text-[#5f6FFF] transition-colors duration-300'>
                    <span>📍</span> Kangra, Himachal Pradesh
                </li>
            </ul>
        </div>

      </div>

      {/* copy right  */}
      <div className='border-t border-gray-200 pt-6'>
            <p className='py-5 text-sm text-center text-gray-600'>Copyright 2025 © <span className='font-semibold text-[#5f6FFF]'>FastDoc</span> - All Rights Reserved.</p>
      </div>
    </div>
  )
}
