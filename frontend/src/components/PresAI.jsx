import React, { useState, useRef, useEffect } from 'react'

const PresAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m PresAI 🤖, your AI health assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: '🏥', text: 'Book Appointment', action: 'book' },
    { icon: '💊', text: 'Find Doctors', action: 'doctors' },
    { icon: '📋', text: 'My Appointments', action: 'appointments' },
    { icon: '❓', text: 'Health Tips', action: 'tips' }
  ]

  const getAIResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
    
    if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are PresAI, a helpful AI health assistant for Prescripto healthcare platform. Prescripto has 100+ verified doctors, offers online consultations, appointment booking, and health services. User: ${userMessage}. Respond in max 80 words, be friendly and helpful.`
                }]
              }]
            })
          }
        )
        const data = await response.json()
        return data.candidates[0].content.parts[0].text
      } catch (error) {
        console.error('AI Error:', error)
      }
    }
    
    // Developer/Creator questions
    if (msg.includes('develop') || msg.includes('creator') || msg.includes('made') || msg.includes('built') || msg.includes('owner')) {
      return '👨💻 I was developed by Neeraj! He built this entire Prescripto platform using MERN stack to help people book appointments easily. Pretty cool, right? 😊'
    } else if (msg.includes('neeraj') || msg.includes('who is neeraj')) {
      return '🌟 Neeraj is the talented developer who created Prescripto and me (PresAI)! He\'s a Full-Stack Developer passionate about healthcare technology. 💻'
    }
    // Health symptoms - check first
    else if (msg.includes('itch') || msg.includes('rash') || msg.includes('skin') || msg.includes('allergy')) {
      return '🩺 Itching can be caused by allergies, dry skin, or infections. I recommend consulting our Dermatologist for proper diagnosis.\n\n📅 Book an appointment now for expert care!'
    } else if (msg.includes('fever') || msg.includes('cold') || msg.includes('cough') || msg.includes('flu')) {
      return '🤒 For fever, cold, or cough symptoms, our General Physicians can help! They\'ll diagnose and prescribe the right treatment.\n\n📅 Book a consultation today!'
    } else if (msg.includes('pain') || msg.includes('hurt') || msg.includes('ache')) {
      return '😣 Pain should be evaluated by a doctor. Our specialists can identify the cause and provide relief.\n\n📅 Schedule an appointment for proper care!'
    } else if (msg.includes('stomach') || msg.includes('digest') || msg.includes('nausea') || msg.includes('vomit') || msg.includes('diarrhea') || msg.includes('loose motion') || msg.includes('loose stool') || msg.includes('dysentery')) {
      return '🤢 Digestive issues like loose motion or diarrhea need medical attention. Our General Physicians can diagnose and treat stomach problems.\n\n📅 Book now for expert consultation!'
    } else if (msg.includes('constipat') || msg.includes('gas') || msg.includes('bloat') || msg.includes('acidity') || msg.includes('indigestion')) {
      return '😖 Digestive discomfort like constipation, gas, or acidity can be treated. Our doctors can prescribe medication and dietary advice.\n\n📅 Get relief today!'
    } else if (msg.includes('who') || msg.includes('what are you') || msg.includes('api') || msg.includes('gpt') || msg.includes('create')) {
      return '👨💻 I was created by Neeraj! He built this entire Prescripto platform using MERN stack. I\'m PresAI, your AI health assistant here to help you book appointments and find doctors. 😊'
    } else if (msg.includes('book') || msg.includes('appointment')) {
      return 'I can help you book an appointment! 📅 Visit our Doctors page to see specialists and time slots. Want to see our top-rated doctors?'
    } else if (msg.includes('doctor') || msg.includes('specialist')) {
      return 'We have 100+ verified doctors:\n\n🩺 General Physician\n👶 Pediatricians\n🧠 Neurologists\n💊 Dermatologists\n\nWhich specialty do you need?'
    } else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return 'Hello! 👋 I\'m PresAI, your AI health assistant. I can help with appointments, finding doctors, and health tips. What do you need?'
    } else if (msg.includes('thank')) {
      return 'You\'re welcome! 😊 Anything else I can help with?'
    } else if (msg.includes('tip') || msg.includes('health')) {
      return '💡 Health Tips:\n✅ Drink 8 glasses water daily\n✅ Exercise 30 min/day\n✅ Sleep 7-8 hours\n✅ Eat balanced meals\n\nNeed personalized advice from our doctors?'
    } else {
      return 'I\'m PresAI! I can help with:\n\n🏥 Book appointments with 100+ specialist doctors\n👨⚕️ Find the right doctor for your condition\n💊 Get instant health advice & symptom guidance\n📋 Manage your medical appointments\n🔬 Lab tests, X-rays, MRI, ultrasound booking\n💉 Vaccination & health checkup packages\n💬 24/7 health support\n\nJust describe your health concern! 😊'
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    const response = await getAIResponse(currentInput)
    
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleQuickAction = (action) => {
    const actionMessages = {
      book: 'I want to book an appointment',
      doctors: 'Show me available doctors',
      appointments: 'Show my appointments',
      tips: 'Give me health tips'
    }
    setInput(actionMessages[action])
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 z-50 cursor-pointer group'
      >
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75'></div>
          <div className='relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300'>
            {isOpen ? (
              <span className='text-3xl text-white'>✕</span>
            ) : (
              <span className='text-3xl'>🤖</span>
            )}
          </div>
          {!isOpen && (
            <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce'>
              1
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className='fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-purple-200'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl'>
                  🤖
                </div>
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
              </div>
              <div className='flex-1'>
                <h3 className='font-bold text-lg'>PresAI</h3>
                <p className='text-xs text-white/80'>AI Health Assistant • Online</p>
              </div>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  <p className='text-sm whitespace-pre-line'>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-white rounded-2xl px-4 py-3 shadow-md'>
                  <div className='flex gap-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className='p-3 bg-white border-t border-gray-200'>
            <div className='grid grid-cols-4 gap-2 mb-3'>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className='flex flex-col items-center gap-1 p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 hover:scale-105'
                >
                  <span className='text-xl'>{action.icon}</span>
                  <span className='text-xs text-gray-700 font-medium text-center'>{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className='p-4 bg-white border-t border-gray-200'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder='Type your message...'
                className='flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
              />
              <button
                onClick={handleSend}
                className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg'
              >
                <span className='text-xl'>➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PresAI
