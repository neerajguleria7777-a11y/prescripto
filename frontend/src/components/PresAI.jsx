import React, { useState, useRef, useEffect } from 'react'

const getAIResponse = async (userMessage, history = []) => {
  const msg = userMessage.toLowerCase().trim()
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

  if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
    try {
      const contextHistory = history
        .slice(-6)
        .map(m => `${m.type === 'user' ? 'User' : 'FastAI'}: ${m.text}`)
        .join('\n')

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are FastAI, a friendly AI health assistant for FastDoc. Talk like a real caring friend who happens to know a lot about health — not like a robot or a customer service bot.

Rules:
- Sound natural and human, like texting a knowledgeable friend
- Use casual language, contractions, occasional emojis (1-2 max)
- Show genuine empathy when someone is unwell — ask follow-up questions
- Don't always push "book appointment" — only suggest it when it genuinely makes sense
- Never use bullet point lists unless absolutely necessary
- Keep responses short (2-4 sentences max)
- If someone is just chatting, just chat back normally
- FastDoc has 100+ verified doctors across all specialties, online & in-person, built by Neeraj

Recent conversation:
${contextHistory}

User: "${userMessage}"

Reply naturally like a real person would.`
              }]
            }]
          })
        }
      )
      const data = await response.json()
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text
      }
    } catch (error) {
      console.error('Gemini API Error:', error)
    }
  }

  // ── Greetings ──
  if (msg.match(/^(hi|hello|hey|hii|helo|heya|yo|sup|good morning|good evening|good afternoon|namaste)[\s!.?]*$/)) {
    const greets = [
      "Hey! 👋 How are you doing today?",
      "Hello! Good to see you here. How can I help?",
      "Hey there! What's up? Anything I can help you with?",
      "Hi! How's everything going? Feeling okay?"
    ]
    return greets[Math.floor(Math.random() * greets.length)]
  }

  // ── How are you ──
  if (msg.includes('how are you') || msg.includes('how r u') || msg.includes('hows you') || msg.includes('wassup') || msg.includes('whats up')) {
    return "I'm doing great, thanks for asking! 😊 More importantly, how are you feeling? Everything okay on your end?"
  }

  // ── Who made / creator ──
  if (msg.includes('who made') || msg.includes('who built') || msg.includes('who created') || msg.includes('developer') || msg.includes('neeraj')) {
    return "I was built by Neeraj — a full-stack developer who created the entire FastDoc platform. Pretty talented guy honestly 😄 Anything I can help you with?"
  }

  // ── Identity ──
  if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('are you ai') || msg.includes('are you a bot') || msg.includes('are you human') || msg.includes('are you real')) {
    return "I'm FastAI — an AI assistant for FastDoc. I'm not human, but I try my best to be helpful and not sound like a robot 😄 What do you need?"
  }

  // ── Feeling unwell general ──
  if (msg.includes('not feeling well') || msg.includes('feeling sick') || msg.includes('feeling bad') || msg.includes('i am sick') || msg.includes("i'm sick") || msg.includes('feeling ill')) {
    return "Oh no, that's not good 😟 What's going on? Tell me what you're feeling and I'll try to help figure out what's up."
  }

  // ── Fever ──
  if (msg.includes('fever') || msg.includes('temperature') || msg.includes('chills')) {
    return "Ugh, fever is the worst 😩 How high is it and how long have you had it? If it's been more than 2-3 days or above 103°F, you really should see a doctor."
  }

  // ── Cold / Cough / Flu ──
  if (msg.includes('cold') || msg.includes('cough') || msg.includes('flu') || msg.includes('runny nose') || msg.includes('sore throat') || msg.includes('sneezing')) {
    return "Sounds like a classic cold or flu situation 😕 Rest, stay hydrated, and if it's been dragging on for more than a week or getting worse, it's worth getting checked out."
  }

  // ── Headache ──
  if (msg.includes('headache') || msg.includes('head hurts') || msg.includes('head pain')) {
    return "Headaches can be so draining. Is it a dull ache or more of a throbbing pain? And has it been happening often lately? That'll help figure out what's going on."
  }

  // ── Migraine ──
  if (msg.includes('migraine')) {
    return "Migraines are brutal, I'm sorry you're dealing with that 😔 Are you in a dark quiet place? That usually helps. If they're happening frequently, a neurologist can really make a difference."
  }

  // ── Stomach / Digestive ──
  if (msg.includes('stomach') || msg.includes('stomach ache') || msg.includes('stomach pain') || msg.includes('nausea') || msg.includes('vomiting') || msg.includes('vomit') || msg.includes('diarrhea') || msg.includes('loose motion') || msg.includes('food poison') || msg.includes('indigestion') || msg.includes('acidity') || msg.includes('heartburn') || msg.includes('bloating') || msg.includes('constipat')) {
    return "Stomach issues are really uncomfortable 😣 How long has this been going on? If it started after eating something, could be food poisoning. Stay hydrated and if it doesn't settle in a day, see a doctor."
  }

  // ── Back / Joint pain ──
  if (msg.includes('back pain') || msg.includes('lower back') || msg.includes('spine') || msg.includes('joint pain') || msg.includes('knee pain') || msg.includes('shoulder pain') || msg.includes('neck pain') || msg.includes('arthritis')) {
    return "Back and joint pain can really mess with your day 😕 Is it a new thing or has it been going on for a while? Chronic pain like that is worth getting properly checked — ignoring it usually makes it worse."
  }

  // ── General pain ──
  if (msg.includes('pain') || msg.includes('hurts') || msg.includes('hurt') || msg.includes('ache')) {
    return "Where exactly does it hurt? And is it constant or does it come and go? Give me a bit more detail and I can point you in the right direction."
  }

  // ── Skin ──
  if (msg.includes('rash') || msg.includes('itching') || msg.includes('itch') || msg.includes('acne') || msg.includes('pimple') || msg.includes('skin') || msg.includes('eczema') || msg.includes('hair fall') || msg.includes('dandruff')) {
    return "Skin stuff can be tricky to figure out without seeing it. How long has it been there and is it spreading? A dermatologist can usually sort it out pretty quickly."
  }

  // ── Mental health ──
  if (msg.includes('anxiety') || msg.includes('anxious') || msg.includes('panic attack') || msg.includes('panic')) {
    return "Anxiety is really tough to deal with, I hear you 💙 Are you going through something stressful right now, or does it just hit out of nowhere? Talking to someone really does help."
  }

  if (msg.includes('depression') || msg.includes('depressed') || msg.includes('feel empty') || msg.includes('no motivation') || msg.includes('hopeless')) {
    return "I'm really sorry you're feeling this way 💙 That takes a lot to admit. Have you been able to talk to anyone about it? You don't have to go through this alone."
  }

  if (msg.includes('stress') || msg.includes('stressed') || msg.includes('overwhelmed') || msg.includes('burnout')) {
    return "Stress can really take a toll on everything — sleep, appetite, mood. What's been going on? Sometimes just talking it through helps a bit."
  }

  if (msg.includes('can\'t sleep') || msg.includes('cant sleep') || msg.includes('insomnia') || msg.includes('not sleeping') || msg.includes('sleep problem')) {
    return "Not being able to sleep is exhausting in the worst way 😔 Is your mind racing at night or you just can't fall asleep? How long has this been happening?"
  }

  if (msg.includes('sad') || msg.includes('feeling down') || msg.includes('unhappy') || msg.includes('lonely') || msg.includes('alone')) {
    return "I'm sorry you're feeling that way 💙 Want to talk about what's going on? Sometimes it helps just to get it out."
  }

  // ── Heart ──
  if (msg.includes('chest pain') || msg.includes('chest tightness') || msg.includes('heart pain')) {
    return "Hey, chest pain is something you really shouldn't wait on — please see a doctor today or go to the ER if it's severe. Better safe than sorry with anything heart-related 🙏"
  }

  if (msg.includes('palpitation') || msg.includes('heart racing') || msg.includes('irregular heartbeat') || msg.includes('heart beating fast')) {
    return "Heart palpitations can be scary. Are you feeling it right now? If it's happening often or comes with dizziness, that's worth getting an ECG done."
  }

  // ── Diabetes / BP / Chronic ──
  if (msg.includes('diabetes') || msg.includes('blood sugar') || msg.includes('sugar level')) {
    return "Managing diabetes is all about consistency. Are you already on medication or just monitoring? Diet and regular checkups make a huge difference in the long run."
  }

  if (msg.includes('blood pressure') || msg.includes('bp') || msg.includes('hypertension') || msg.includes('high bp') || msg.includes('low bp')) {
    return "BP issues are really common but definitely need attention. Are you monitoring it regularly at home? Lifestyle changes alongside medication can work really well."
  }

  if (msg.includes('thyroid') || msg.includes('pcod') || msg.includes('pcos') || msg.includes('cholesterol')) {
    return "These are manageable with the right treatment plan. Are you already seeing a doctor for it, or are you just noticing symptoms? Getting proper tests done is the first step."
  }

  // ── Women's health ──
  if (msg.includes('pregnant') || msg.includes('pregnancy')) {
    return "Congratulations or I hope everything's okay — depending on the situation! 😊 What's going on? I'm happy to help with any questions."
  }

  if (msg.includes('period') || msg.includes('menstrual') || msg.includes('irregular period') || msg.includes('cramps')) {
    return "Period issues are so common but that doesn't make them any less annoying. Is it the pain, irregularity, or something else that's bothering you?"
  }

  // ── Child health ──
  if (msg.includes('baby') || msg.includes('infant') || msg.includes('toddler') || msg.includes('my child') || msg.includes('my kid')) {
    return "When it comes to kids, it's always better to check with a pediatrician rather than guess. What's going on with your little one?"
  }

  if (msg.includes('vaccination') || msg.includes('vaccine')) {
    return "Vaccinations are so important, especially for kids. Are you looking for a schedule or have questions about a specific vaccine?"
  }

  // ── Respiratory ──
  if (msg.includes('asthma') || msg.includes('wheezing') || msg.includes('shortness of breath') || msg.includes('breathing problem') || msg.includes('breathless')) {
    return "Breathing difficulties are serious — don't push through them. Do you have an inhaler? If this is new or getting worse, please get it checked out soon."
  }

  // ── Infections ──
  if (msg.includes('dengue') || msg.includes('malaria') || msg.includes('typhoid')) {
    return "These need proper diagnosis and treatment — don't try to manage them at home. How long have you had symptoms? A blood test will confirm it quickly."
  }

  if (msg.includes('uti') || msg.includes('urinary') || msg.includes('burning urination')) {
    return "UTIs are really uncomfortable but thankfully easy to treat with the right antibiotics. Are you drinking enough water? See a doctor soon — they clear up fast with treatment."
  }

  // ── Diet / Fitness ──
  if (msg.includes('diet') || msg.includes('weight loss') || msg.includes('lose weight') || msg.includes('nutrition') || msg.includes('eating healthy')) {
    return "Honestly the best diet is one you can actually stick to 😄 Are you trying to lose weight, manage a condition, or just eat healthier in general?"
  }

  if (msg.includes('gym') || msg.includes('workout') || msg.includes('exercise') || msg.includes('fitness')) {
    return "Love that you're staying active! 💪 Are you just getting started or looking to level up your routine? What's your goal?"
  }

  if (msg.includes('yoga') || msg.includes('meditation')) {
    return "Yoga and meditation are genuinely great for both body and mind. Even 10-15 minutes a day makes a noticeable difference over time."
  }

  // ── Booking ──
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('consult')) {
    return "Sure! Just head to the doctors section, pick a specialist, and choose a time that works for you. It only takes a minute. Need help finding the right doctor?"
  }

  // ── Doctors ──
  if (msg.includes('find doctor') || msg.includes('which doctor') || msg.includes('what doctor') || msg.includes('which specialist')) {
    return "Depends on what's going on! Tell me your symptoms and I'll point you to the right specialist."
  }

  if (msg.includes('doctor') || msg.includes('specialist')) {
    return "We've got doctors across all specialties — general physicians, dermatologists, neurologists, gynecologists, pediatricians, and more. What do you need help with?"
  }

  // ── Payment ──
  if (msg.includes('cost') || msg.includes('fees') || msg.includes('price') || msg.includes('how much') || msg.includes('payment') || msg.includes('pay')) {
    return "Consultation fees vary by doctor and specialty. You can pay online via Razorpay or choose cash on delivery. Chatting with me is always free though 😄"
  }

  // ── Cancel / Reschedule ──
  if (msg.includes('cancel') || msg.includes('reschedule') || msg.includes('change appointment')) {
    return "You can cancel or reschedule from the 'My Appointments' section in your profile. Pretty straightforward. Need help with anything else?"
  }

  // ── Medicine ──
  if (msg.includes('medicine') || msg.includes('tablet') || msg.includes('pill') || msg.includes('prescription') || msg.includes('painkiller')) {
    return "I can't prescribe anything — that's the doctor's job! But I can help you figure out which type of doctor to see. What's the issue?"
  }

  // ── Emergency ──
  if (msg.includes('emergency') || msg.includes('unconscious') || msg.includes('not breathing') || msg.includes('stroke') || msg.includes('cardiac arrest')) {
    return "🚨 This sounds serious — please call 102 or 108 right now or get to the nearest hospital immediately. Don't wait!"
  }

  // ── Health tips ──
  if (msg.includes('health tip') || msg.includes('tips') || msg.includes('stay healthy') || msg.includes('healthy lifestyle')) {
    return "Honestly the basics work — sleep well, drink enough water, move your body a bit every day, and don't skip meals. Boring advice but it genuinely works 😄"
  }

  // ── Casual chat ──
  if (msg.includes('bored') || msg.includes('boring')) {
    return "Haha fair enough 😄 Well since you're here, when did you last get a health checkup? Might be a good time!"
  }

  if (msg.includes('joke') || msg.includes('funny') || msg.includes('make me laugh')) {
    return "Why did the doctor carry a red pen? In case they needed to draw blood 😂 Okay okay, I'll stick to health advice."
  }

  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx') || msg.includes('ty')) {
    return "Anytime! 😊 Hope you feel better soon. Take care of yourself!"
  }

  if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('cya') || msg.includes('take care')) {
    return "Take care! 👋 Come back anytime if you need anything. Stay healthy!"
  }

  if (msg.includes('ok') || msg.includes('okay') || msg.includes('alright') || msg.includes('got it') || msg.includes('i see')) {
    return "Cool! Let me know if there's anything else on your mind 😊"
  }

  if (msg.includes('no') || msg.includes('nah') || msg.includes('nope') || msg.includes('not really')) {
    return "No worries! I'm here if you need anything 😊"
  }

  if (msg.includes('yes') || msg.includes('yeah') || msg.includes('yep') || msg.includes('sure') || msg.includes('yup')) {
    return "Great! What would you like to do?"
  }

  if (msg.includes('lol') || msg.includes('haha') || msg.includes('hehe') || msg.includes('😂') || msg.includes('😄')) {
    return "😄 Glad you're in a good mood! Anything I can help you with?"
  }

  if (msg.includes('what is fastdoc') || msg.includes('about fastdoc') || msg.includes('tell me about')) {
    return "FastDoc is a healthcare platform where you can book appointments with verified doctors online or in-person. Built by Neeraj, it covers everything from general checkups to specialist consultations."
  }

  // ── Default ──
  return "Hmm, I'm not sure I fully got that. Could you tell me a bit more? I'm here to help with anything health-related 😊"
}

const FastAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hey! 👋 I'm FastAI, your health assistant on FastDoc. How are you feeling today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return

    const userMsg = {
      type: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const allMessages = [...messages, userMsg]
    const responseText = await getAIResponse(text, allMessages)
    const delay = Math.min(500 + responseText.length * 10, 1800)

    setTimeout(() => {
      setMessages(prev => [
        ...prev.slice(-40),
        {
          type: 'bot',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setIsTyping(false)
    }, delay)
  }

  const quickReplies = ['Book Appointment', 'Find a Doctor', 'I\'m not feeling well', 'Health Tips']

  return (
    <>
      {/* Toggle Button */}
      <div onClick={() => setIsOpen(!isOpen)} className='fixed bottom-6 right-6 z-50 cursor-pointer'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-60'></div>
          <div className='relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300'>
            {isOpen ? <span className='text-2xl text-white font-bold'>✕</span> : <span className='text-3xl'>🤖</span>}
          </div>
          {!isOpen && (
            <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce'>1</div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className='fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-purple-100'>

          {/* Header */}
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-2xl'>🤖</div>
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
              </div>
              <div>
                <h3 className='font-bold text-base'>FastAI</h3>
                <p className='text-xs text-white/75'>Health Assistant · Always here</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50'>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'}`}>
                  <p className='text-sm leading-relaxed'>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100'>
                  <div className='flex gap-1 items-center h-4'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: '0.15s' }}></div>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className='px-3 pt-2 pb-1 bg-white border-t border-gray-100'>
            <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-1'>
              {quickReplies.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className='whitespace-nowrap text-xs px-3 py-1.5 border border-purple-200 text-purple-600 rounded-full hover:bg-purple-50 transition-colors duration-200 disabled:opacity-40'
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className='p-3 bg-white border-t border-gray-100'>
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder='Type a message...'
                disabled={isTyping}
                className='flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm disabled:opacity-50'
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isTyping || !input.trim()}
                className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 shadow-md disabled:opacity-40 disabled:scale-100'
              >
                <span className='text-base'>➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FastAI
