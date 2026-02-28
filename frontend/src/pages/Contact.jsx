import {assets} from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className='fade-in-up'>
      <div className='text-center pt-10 mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-3'>
          CONTACT <span className='gradient-text'>US</span>
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>Get in touch with us for any queries or support</p>
      </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-12 mb-28'>
      <img className='w-full md:max-w-[450px] rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500' src={assets.contact_image} alt="" />

      <div className='flex flex-col justify-center gap-8'>
        <div className='bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#5f6FFF] card-hover'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-2xl'>
              🏢
            </div>
            <h3 className='text-xl font-bold text-gray-800'>OUR OFFICE</h3>
          </div>
          <p className='text-gray-600 leading-relaxed mb-2'>Kangra, Himachal Pradesh</p>
          <p className='text-gray-600 leading-relaxed'>India</p>
        </div>

        <div className='bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#5f6FFF] card-hover'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-2xl'>
              📞
            </div>
            <h3 className='text-xl font-bold text-gray-800'>GET IN TOUCH</h3>
          </div>
          <p className='text-gray-600 leading-relaxed mb-2'>
            <span className='font-semibold text-gray-700'>Tel:</span> +91 8091043893
          </p>
          <p className='text-gray-600 leading-relaxed'>
            <span className='font-semibold text-gray-700'>Email:</span> prescripto@gmail.com
          </p>
        </div>

        <div className='bg-gradient-to-r from-[#5f6FFF]/10 to-[#7a88ff]/10 border-2 border-[#5f6FFF] rounded-2xl p-8'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-2xl'>
              💼
            </div>
            <h3 className='text-xl font-bold text-gray-800'>CAREERS AT PRESCRIPTO</h3>
          </div>
          <p className='text-gray-700 leading-relaxed mb-6'>Learn more about our teams and job openings.</p>
          <button className='w-full md:w-auto gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300'>
            Explore Jobs →
          </button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Contact
