import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

export default function Banner() {

    const navigate = useNavigate();

  return (
    <div className='relative my-20 md:mx-10 overflow-hidden'>
      {/* Gradient Background with Animation */}
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] animate-pulse'></div>
      </div>

      <div className='relative rounded-3xl shadow-2xl overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center'>
          {/* Left Content */}
          <div className='flex-1 py-12 md:py-16 lg:py-24 px-6 md:px-10 lg:px-16 relative z-10'>
            <div className='space-y-6'>
              {/* Badge */}
              <div className='inline-block'>
                <span className='px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold'>
                  ⚡ Limited Time Offer
                </span>
              </div>

              {/* Heading */}
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight'>
                Book Appointment
                <span className='block text-yellow-300 mt-2'>With 100+ Trusted Doctors</span>
              </h2>

              {/* Description */}
              <p className='text-white/90 text-base md:text-lg max-w-xl'>
                Get instant access to qualified healthcare professionals. Schedule your consultation in just 60 seconds.
              </p>

              {/* Stats */}
              <div className='flex flex-wrap gap-6 py-4'>
                <div className='text-white'>
                  <div className='text-3xl font-black'>100+</div>
                  <div className='text-sm text-white/80'>Expert Doctors</div>
                </div>
                <div className='text-white'>
                  <div className='text-3xl font-black'>50K+</div>
                  <div className='text-sm text-white/80'>Happy Patients</div>
                </div>
                <div className='text-white'>
                  <div className='text-3xl font-black'>4.9⭐</div>
                  <div className='text-sm text-white/80'>Average Rating</div>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => {navigate('/login'), scrollTo(0,0)}} 
                className='group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3'
              >
                <span>Create Account Now</span>
                <span className='group-hover:translate-x-2 transition-transform duration-300'>→</span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className='hidden md:block md:w-1/2 lg:w-[450px] relative'>
            <div className='relative h-full'>
              {/* Decorative Elements */}
              <div className='absolute top-10 right-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-pulse'></div>
              <div className='absolute bottom-10 left-10 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl animate-pulse' style={{animationDelay: '1s'}}></div>
              
              {/* Image */}
              <img 
                className='relative z-10 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                src={assets.appointment_img} 
                alt="Book Appointment" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
