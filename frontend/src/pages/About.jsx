import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='fade-in-up'>
      <div className='text-center pt-10 mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-3'>
          ABOUT <span className='gradient-text'>US</span>
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>Learn more about our mission to revolutionize healthcare</p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
        <img className='w-full md:max-w-[400px] rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
          <div className='space-y-4'>
            <p className='text-lg leading-relaxed'>Welcome to <span className='font-bold text-[#5f6FFF]'>FastDoc</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At FastDoc, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p className='text-lg leading-relaxed'>FastDoc is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, FastDoc is here to support you every step of the way.</p>
          </div>
          <div className='bg-gradient-to-r from-[#5f6FFF]/10 to-[#7a88ff]/10 p-6 rounded-xl border-l-4 border-[#5f6FFF]'>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Our Vision</h3>
            <p className='text-gray-700 leading-relaxed'>Our vision at FastDoc is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
      </div>

      <div className='mt-16 mb-8'>
        <h2 className='text-3xl font-bold text-center mb-3'>
          WHY <span className='gradient-text'>CHOOSE US</span>
        </h2>
        <p className='text-center text-gray-600 mb-8'>Discover what makes us different</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='group border-2 border-gray-200 rounded-2xl px-8 py-10 flex flex-col gap-4 hover:border-[#5f6FFF] card-hover bg-white shadow-sm'>
          <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-3xl mb-2'>
            ⚡
          </div>
          <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#5f6FFF] transition-colors'>EFFICIENCY</h3>
          <p className='text-gray-600 leading-relaxed'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='group border-2 border-gray-200 rounded-2xl px-8 py-10 flex flex-col gap-4 hover:border-[#5f6FFF] card-hover bg-white shadow-sm'>
          <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-3xl mb-2'>
            🎯
          </div>
          <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#5f6FFF] transition-colors'>CONVENIENCE</h3>
          <p className='text-gray-600 leading-relaxed'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='group border-2 border-gray-200 rounded-2xl px-8 py-10 flex flex-col gap-4 hover:border-[#5f6FFF] card-hover bg-white shadow-sm'>
          <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-3xl mb-2'>
            💝
          </div>
          <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#5f6FFF] transition-colors'>PERSONALIZATION</h3>
          <p className='text-gray-600 leading-relaxed'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
