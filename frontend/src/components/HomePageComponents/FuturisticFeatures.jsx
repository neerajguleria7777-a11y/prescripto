import React, { useState } from 'react'

const FuturisticFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Diagnosis',
      subtitle: 'Smart Health Assistant',
      description: 'Advanced AI analyzes symptoms in real-time, predicts health risks, and recommends the perfect specialist for you.',
      stats: ['99.2% Accuracy', '2M+ Diagnoses', '24/7 Available'],
      color: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/50'
    },
    {
      icon: '🔗',
      title: 'Blockchain Health Records',
      subtitle: 'Secure & Immutable',
      description: 'Your medical history stored on blockchain - unhackable, portable, and owned by YOU. Access anywhere, anytime.',
      stats: ['100% Secure', 'Zero Breaches', 'Instant Access'],
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/50'
    },
    {
      icon: '🎯',
      title: 'Predictive Health Analytics',
      subtitle: 'Future Health Insights',
      description: 'Machine learning predicts potential health issues before they occur. Prevention is better than cure.',
      stats: ['85% Prevention', 'Early Detection', 'Personalized'],
      color: 'from-green-500 to-emerald-500',
      glow: 'shadow-green-500/50'
    },
    {
      icon: '🌐',
      title: 'Metaverse Consultations',
      subtitle: 'Virtual Reality Clinics',
      description: 'Meet doctors in immersive VR environments. Feel like you\'re in the same room, from anywhere in the world.',
      stats: ['VR Ready', '3D Avatars', 'Global Access'],
      color: 'from-orange-500 to-red-500',
      glow: 'shadow-orange-500/50'
    },
    {
      icon: '⚡',
      title: 'Instant Lab Results',
      subtitle: 'Real-Time Processing',
      description: 'AI-powered lab analysis delivers results in minutes, not days. Quantum computing accelerates everything.',
      stats: ['5min Results', 'Quantum Speed', '100% Accurate'],
      color: 'from-yellow-500 to-amber-500',
      glow: 'shadow-yellow-500/50'
    },
    {
      icon: '🧬',
      title: 'DNA-Based Treatment',
      subtitle: 'Personalized Medicine',
      description: 'Treatments tailored to your unique genetic makeup. The future of precision medicine is here.',
      stats: ['DNA Analysis', 'Custom Plans', '3x Effective'],
      color: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/50'
    }
  ]

  return (
    <div className='py-12 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
        <div className='absolute top-1/2 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <div className='inline-block mb-4'>
            <span className='px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs md:text-sm font-bold animate-pulse'>
              🚀 REVOLUTIONARY TECHNOLOGY
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 px-4'>
            What Makes Us
            <span className='block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              DIFFERENT
            </span>
          </h2>
          <p className='text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4'>
            We're not just a healthcare platform. We're building the future of medicine with cutting-edge technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 ${
                activeFeature === index 
                  ? `bg-gradient-to-br ${feature.color} scale-105 shadow-2xl ${feature.glow}` 
                  : 'bg-white/10 backdrop-blur-lg hover:bg-white/20'
              }`}
            >
              {/* Icon */}
              <div className={`text-4xl md:text-6xl mb-3 md:mb-4 transform transition-transform duration-500 ${
                activeFeature === index ? 'scale-110 rotate-12' : 'group-hover:scale-110'
              }`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className={`text-lg md:text-2xl font-bold mb-2 ${
                activeFeature === index ? 'text-white' : 'text-white/90'
              }`}>
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p className={`text-xs md:text-sm mb-3 md:mb-4 ${
                activeFeature === index ? 'text-white/90' : 'text-gray-400'
              }`}>
                {feature.subtitle}
              </p>

              {/* Description */}
              <p className={`text-xs md:text-sm leading-relaxed mb-4 md:mb-6 ${
                activeFeature === index ? 'text-white/80' : 'text-gray-300'
              }`}>
                {feature.description}
              </p>

              {/* Stats */}
              <div className='flex flex-wrap gap-2'>
                {feature.stats.map((stat, i) => (
                  <span
                    key={i}
                    className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                      activeFeature === index 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {stat}
                  </span>
                ))}
              </div>

              {/* Glow Effect */}
              {activeFeature === index && (
                <div className='absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none'></div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack Showcase */}
        <div className='bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 mx-4'>
          <h3 className='text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8'>
            Powered By Next-Gen Technology
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6'>
            {[
              { name: 'Artificial Intelligence', icon: '🧠', desc: 'Deep Learning Models' },
              { name: 'Blockchain', icon: '⛓️', desc: 'Web3 Integration' },
              { name: 'Quantum Computing', icon: '⚛️', desc: 'Ultra-Fast Processing' },
              { name: 'IoT Devices', icon: '📱', desc: 'Smart Wearables' },
              { name: 'Cloud Computing', icon: '☁️', desc: 'Scalable Infrastructure' },
              { name: 'Big Data', icon: '📊', desc: 'Predictive Analytics' },
              { name: 'AR/VR', icon: '🥽', desc: 'Immersive Experience' },
              { name: '5G Network', icon: '📡', desc: 'Lightning Speed' }
            ].map((tech, index) => (
              <div
                key={index}
                className='group p-4 md:p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl md:rounded-2xl hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/10'
              >
                <div className='text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300'>
                  {tech.icon}
                </div>
                <h4 className='text-white font-bold text-xs md:text-sm mb-1'>{tech.name}</h4>
                <p className='text-gray-400 text-xs'>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className='mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-4'>
          {[
            { value: '99.9%', label: 'Uptime', icon: '⚡' },
            { value: '<100ms', label: 'Response Time', icon: '🚀' },
            { value: '256-bit', label: 'Encryption', icon: '🔒' },
            { value: 'ISO 27001', label: 'Certified', icon: '✅' }
          ].map((stat, index) => (
            <div
              key={index}
              className='text-center p-4 md:p-6 bg-gradient-to-br from-white/10 to-transparent rounded-xl md:rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300'
            >
              <div className='text-2xl md:text-3xl mb-2'>{stat.icon}</div>
              <div className='text-2xl md:text-3xl font-black text-white mb-1'>{stat.value}</div>
              <div className='text-xs md:text-sm text-gray-400'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FuturisticFeatures
