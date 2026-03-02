import React, { useState, useRef, useEffect } from 'react'

const PresAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m FastAI 🤖, your AI health assistant for FastDoc. How can I help you today?',
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
                  text: `You are FastAI, a friendly and empathetic AI health assistant for FastDoc healthcare platform. 
                  
                  About FastDoc:
                  - 100+ verified specialist doctors
                  - Online consultations & appointment booking
                  - Specialties: General Physician, Pediatricians, Neurologists, Dermatologists, Gynecologists, Gastroenterologists
                  - Lab tests, X-rays, MRI, ultrasound booking available
                  - 24/7 health support
                  - Developed by Neeraj using MERN stack
                  
                  Your personality:
                  - Warm, caring, and professional
                  - Use emojis naturally (but not excessively)
                  - Show empathy for health concerns
                  - Be conversational and friendly
                  - Ask follow-up questions when appropriate
                  - Provide actionable advice
                  
                  User message: "${userMessage}"
                  
                  Respond in a natural, conversational way (max 100 words). If it's a health concern, show empathy first, then suggest the right specialist and encourage booking an appointment.`
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
      return '👨💻 Great question! I (FastAI) was created by Neeraj, a talented Full-Stack Developer. He built this entire FastDoc platform AND me using MERN stack and AI to make healthcare more accessible. Pretty amazing, right? 😊\n\nIs there anything else you\'d like to know?'
    } else if (msg.includes('neeraj') || msg.includes('who is neeraj')) {
      return '🌟 Neeraj is the brilliant mind behind FastDoc and me (FastAI)! He\'s passionate about using technology to improve healthcare. He created this platform to help people easily connect with doctors and manage their health. 💻\n\nWant to know more about our services?'
    }
    // Greetings - more natural
    else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good evening')) {
      return 'Hello there! 👋 Great to see you! I\'m FastAI, your friendly AI health assistant. \n\nI\'m here to help you with:\n• Booking appointments\n• Finding the right doctor\n• Health advice\n• Managing your appointments\n\nWhat brings you here today? 😊'
    }
    // Casual conversation
    else if (msg.includes('how are you') || msg.includes('how r u') || msg.includes('whats up') || msg.includes('wassup')) {
      return 'I\'m doing great, thanks for asking! 😊 More importantly, how are YOU feeling today? Is there anything health-related I can help you with?'
    } else if (msg.includes('joke') || msg.includes('funny')) {
      return '😄 Here\'s one: Why did the doctor carry a red pen? In case they needed to draw blood! 😂\n\nBut seriously, is there anything health-related I can help you with today?'
    } else if (msg.includes('gym') || msg.includes('workout') || msg.includes('exercise') || msg.includes('fitness') || msg.includes('weight loss')) {
      return 'Fitness goals! 💪🏋️ That\'s awesome! Exercise is great for health, but it\'s important to do it right.\n\nOur doctors can guide you on safe workout routines, diet plans, and weight management. Want professional advice?'
    } else if (msg.includes('work') || msg.includes('job') || msg.includes('office') || msg.includes('boss') || msg.includes('busy')) {
      return 'Work stress is real! 💼😓 Many people face work-related health issues like stress, anxiety, or burnout.\n\nOur doctors can help with stress management. Would you like to schedule a consultation?'
    } else if (msg.includes('study') || msg.includes('exam') || msg.includes('college') || msg.includes('school')) {
      return 'Student life can be stressful! 📚😰 Exam pressure, irregular sleep, and stress are common issues.\n\nTaking care of your health is crucial for good performance. Need help with stress management or health checkups?'
    } else if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('serious') || msg.includes('help me')) {
      return '🚨 If this is a medical emergency, please call emergency services immediately or visit the nearest hospital!\n\nFor urgent but non-emergency consultations, I can help you book a priority appointment with our doctors right away. What\'s the situation?'
    } else if (msg.includes('love') || msg.includes('relationship') || msg.includes('girlfriend') || msg.includes('boyfriend') || msg.includes('breakup')) {
      return '❤️ Relationships affect our mental health! Heartbreak, stress, or anxiety from relationships is real.\n\nTalking to a professional can help. Our doctors provide mental health support. Want to schedule a consultation?'
    } else if (msg.includes('lonely') || msg.includes('alone') || msg.includes('no friends')) {
      return 'You\'re not alone! 🤗 Loneliness can affect mental and physical health.\n\nTalking to someone helps. Our doctors can provide support and guidance. Would you like to connect with a professional?'
    } else if (msg.includes('smoking') || msg.includes('cigarette') || msg.includes('tobacco') || msg.includes('quit smoke')) {
      return '🚭 Great that you\'re thinking about quitting! Smoking affects your lungs, heart, and overall health.\n\nOur doctors can help you quit with proper guidance and medication. Ready to take the first step?'
    } else if (msg.includes('alcohol') || msg.includes('drink') || msg.includes('beer') || msg.includes('wine') || msg.includes('addiction')) {
      return '🍺 Alcohol consumption affects your liver, brain, and overall health. If you\'re concerned about your drinking habits, that\'s a good sign!\n\nOur doctors can provide support and treatment plans. Want to talk to someone?'
    } else if (msg.includes('covid') || msg.includes('corona') || msg.includes('pandemic') || msg.includes('vaccine')) {
      return '😷 COVID-19 concerns? We\'re here to help! Whether it\'s symptoms, testing, vaccination, or post-COVID issues.\n\nOur doctors can guide you through it. Need a consultation?'
    } else if (msg.includes('insurance') || msg.includes('claim') || msg.includes('cashless')) {
      return '💳 We accept various insurance plans and offer cashless treatment options!\n\nFor specific insurance queries, our support team can help. Would you like to book an appointment first?'
    } else if (msg.includes('report') || msg.includes('test result') || msg.includes('lab report') || msg.includes('blood test')) {
      return '📋 Need help understanding your medical reports? Our doctors can explain your test results and suggest next steps.\n\nWant to book a consultation to discuss your reports?'
    } else if (msg.includes('medicine') || msg.includes('tablet') || msg.includes('pill') || msg.includes('drug') || msg.includes('prescription')) {
      return '💊 Medication questions? Our doctors can prescribe medicines, explain dosages, and check for side effects.\n\nNever self-medicate! Want to consult a doctor?'
    } else if (msg.includes('surgery') || msg.includes('operation') || msg.includes('hospital')) {
      return '🏥 Surgery or hospitalization concerns? Our doctors can guide you on whether surgery is needed, preparation, and recovery.\n\nWould you like to consult a specialist?'
    } else if (msg.includes('old') || msg.includes('elderly') || msg.includes('senior') || msg.includes('parent')) {
      return '👴👵 Elderly care is important! Age-related health issues need special attention.\n\nOur doctors can help with geriatric care, chronic disease management, and preventive health. Need an appointment?'
    } else if (msg.includes('diet') || msg.includes('nutrition') || msg.includes('meal plan') || msg.includes('calories')) {
      return '🥗 Nutrition is key to good health! Proper diet can prevent and manage many health conditions.\n\nOur doctors can create personalized diet plans based on your health needs. Interested?'
    } else if (msg.includes('yoga') || msg.includes('meditation') || msg.includes('breathing')) {
      return '🧘 Yoga and meditation are excellent for physical and mental health! They reduce stress and improve overall wellness.\n\nOur doctors can recommend specific practices for your health condition. Want guidance?'
    } else if (msg.includes('online') || msg.includes('video call') || msg.includes('telemedicine') || msg.includes('virtual')) {
      return '💻 Yes! We offer online video consultations! You can consult doctors from the comfort of your home.\n\nSafe, convenient, and effective. Ready to book an online appointment?'
    } else if (msg.includes('timing') || msg.includes('hours') || msg.includes('available') || msg.includes('open')) {
      return '⏰ We\'re available 24/7! You can book appointments at your convenience.\n\nOur doctors have flexible schedules. Want to check available slots?'
    } else if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('clinic')) {
      return '📍 We offer both online consultations and in-person visits at various locations.\n\nWhich city are you in? I can help you find the nearest doctor!'
    } else if (msg.includes('rating') || msg.includes('review') || msg.includes('feedback') || msg.includes('experience')) {
      return '⭐ All our doctors are verified with excellent ratings! You can check doctor profiles, reviews, and patient feedback.\n\nWant to see our top-rated doctors?'
    } else if (msg.includes('family') || msg.includes('husband') || msg.includes('wife') || msg.includes('son') || msg.includes('daughter')) {
      return '👨‍👩‍👧‍👦 Family health matters! We provide care for all age groups - from kids to elderly.\n\nYou can book appointments for your family members too. Need help?'
    } else if (msg.includes('first time') || msg.includes('new user') || msg.includes('how to use')) {
      return '🎉 Welcome! First time here? It\'s super easy!\n\n1️⃣ Tell me your health concern\n2️⃣ I\'ll suggest the right doctor\n3️⃣ Choose a time slot\n4️⃣ Book and consult!\n\nWhat\'s your health concern today?'
    }
    // Health symptoms - more empathetic
    else if (msg.includes('itch') || msg.includes('rash') || msg.includes('skin') || msg.includes('allergy') || msg.includes('acne') || msg.includes('pimple') || msg.includes('eczema') || msg.includes('psoriasis') || msg.includes('dandruff') || msg.includes('hair fall') || msg.includes('bald')) {
      return 'Oh no, skin issues can be really uncomfortable! 😟 Itching, rashes, acne, or hair problems can have various causes - allergies, infections, hormonal changes, or other conditions.\n\n🩺 I\'d recommend consulting our Dermatologist who can properly examine and diagnose the issue.\n\n📅 Would you like me to help you book an appointment?'
    } else if (msg.includes('fever') || msg.includes('cold') || msg.includes('cough') || msg.includes('flu') || msg.includes('sneez') || msg.includes('sore throat') || msg.includes('runny nose') || msg.includes('congestion') || msg.includes('chills') || msg.includes('body ache') || msg.includes('weakness') || msg.includes('tired') || msg.includes('fatigue')) {
      return 'I\'m sorry you\'re not feeling well! 🤒 Fever, cold, cough, and fatigue can really drain your energy.\n\n👨⚕️ Our General Physicians are experienced in treating these symptoms and can prescribe the right medication.\n\n📅 Shall I help you schedule a consultation? The sooner you get checked, the faster you\'ll feel better!'
    } else if (msg.includes('headache') || msg.includes('migraine') || msg.includes('dizzy') || msg.includes('vertigo') || msg.includes('seizure') || msg.includes('tremor') || msg.includes('numbness') || msg.includes('paralysis') || msg.includes('memory') || msg.includes('alzheimer') || msg.includes('parkinson')) {
      return 'Neurological symptoms need proper attention! 🧠 Headaches, dizziness, or memory issues shouldn\'t be ignored.\n\n👨⚕️ Our Neurologists specialize in diagnosing and treating brain and nervous system conditions.\n\n📅 Would you like to book a consultation for a thorough evaluation?'
    } else if (msg.includes('pain') || msg.includes('hurt') || msg.includes('ache') || msg.includes('back pain') || msg.includes('neck pain') || msg.includes('joint pain') || msg.includes('knee pain') || msg.includes('shoulder pain') || msg.includes('arthritis') || msg.includes('sprain') || msg.includes('fracture')) {
      return 'I understand pain can be really difficult to deal with. 😣 Back pain, joint pain, or injuries need proper evaluation.\n\n👨⚕️ Our specialists can identify what\'s causing your pain and provide proper treatment for relief.\n\n📅 Would you like to book an appointment? Let\'s get you feeling better soon!'
    } else if (msg.includes('stomach') || msg.includes('digest') || msg.includes('nausea') || msg.includes('vomit') || msg.includes('diarrhea') || msg.includes('loose motion') || msg.includes('loose stool') || msg.includes('dysentery') || msg.includes('food poison') || msg.includes('ulcer') || msg.includes('gastric') || msg.includes('ibs') || msg.includes('crohn')) {
      return 'That sounds really uncomfortable! 🤢 Digestive issues like these shouldn\'t be ignored.\n\n👨⚕️ Our General Physicians and Gastroenterologists can diagnose the cause and provide effective treatment.\n\n📅 I recommend booking an appointment soon. In the meantime, stay hydrated! Would you like help scheduling?'
    } else if (msg.includes('constipat') || msg.includes('gas') || msg.includes('bloat') || msg.includes('acidity') || msg.includes('indigestion') || msg.includes('heartburn') || msg.includes('acid reflux') || msg.includes('gerd')) {
      return 'Digestive discomfort can really affect your day! 😖 Issues like constipation, gas, acidity, or heartburn are common but treatable.\n\n👨⚕️ Our doctors can prescribe medication and suggest dietary changes to help you feel better.\n\n📅 Ready to book a consultation? Let\'s get you some relief!'
    } else if (msg.includes('diabetes') || msg.includes('sugar') || msg.includes('blood sugar') || msg.includes('insulin') || msg.includes('thyroid') || msg.includes('hormone') || msg.includes('pcod') || msg.includes('pcos') || msg.includes('cholesterol') || msg.includes('bp') || msg.includes('blood pressure') || msg.includes('hypertension')) {
      return 'Managing chronic conditions is important! 💊 Diabetes, thyroid, PCOS, or blood pressure issues need regular monitoring.\n\n👨⚕️ Our General Physicians can help manage your condition with proper medication and lifestyle advice.\n\n📅 Would you like to schedule a consultation for better health management?'
    } else if (msg.includes('pregnant') || msg.includes('pregnancy') || msg.includes('period') || msg.includes('menstrual') || msg.includes('cramp') || msg.includes('irregular period') || msg.includes('white discharge') || msg.includes('uti') || msg.includes('urinary') || msg.includes('gynec')) {
      return 'Women\'s health is important! 🤰 Pregnancy, menstrual issues, or gynecological concerns need specialized care.\n\n👩⚕️ Our Gynecologists are experienced in handling all women\'s health issues with care and privacy.\n\n📅 Would you like to book a consultation? We\'re here to help!'
    } else if (msg.includes('child') || msg.includes('baby') || msg.includes('kid') || msg.includes('infant') || msg.includes('toddler') || msg.includes('vaccination') || msg.includes('vaccine') || msg.includes('growth') || msg.includes('development')) {
      return 'Your child\'s health matters! 👶 Whether it\'s vaccinations, growth concerns, or childhood illnesses, we\'re here to help.\n\n👨⚕️ Our Pediatricians specialize in child healthcare and development.\n\n📅 Would you like to book an appointment for your little one?'
    } else if (msg.includes('heart') || msg.includes('chest pain') || msg.includes('cardiac') || msg.includes('breathless') || msg.includes('palpitation') || msg.includes('ecg') || msg.includes('echo')) {
      return 'Heart-related symptoms need immediate attention! ❤️ Chest pain, breathlessness, or palpitations shouldn\'t be ignored.\n\n👨⚕️ Please consult our General Physician immediately for proper evaluation and tests.\n\n📅 Would you like to book an urgent consultation?'
    } else if (msg.includes('eye') || msg.includes('vision') || msg.includes('blind') || msg.includes('cataract') || msg.includes('glasses') || msg.includes('lens') || msg.includes('red eye') || msg.includes('eye pain')) {
      return 'Eye health is crucial! 👁️ Vision problems, eye pain, or infections need proper care.\n\n👨⚕️ I recommend consulting an eye specialist for proper examination.\n\n📅 Would you like help finding the right doctor?'
    } else if (msg.includes('ear') || msg.includes('hearing') || msg.includes('deaf') || msg.includes('ear pain') || msg.includes('tinnitus') || msg.includes('nose') || msg.includes('sinus') || msg.includes('throat')) {
      return 'ENT issues can be quite bothersome! 👂 Ear pain, hearing problems, sinus, or throat issues need attention.\n\n👨⚕️ Our ENT specialists can diagnose and treat these conditions effectively.\n\n📅 Ready to book a consultation?'
    } else if (msg.includes('dental') || msg.includes('tooth') || msg.includes('teeth') || msg.includes('cavity') || msg.includes('gum') || msg.includes('toothache') || msg.includes('root canal') || msg.includes('braces')) {
      return 'Dental health is important! 🦷 Toothache, cavities, or gum problems shouldn\'t be delayed.\n\n👨⚕️ Our dental specialists can provide proper treatment and care.\n\n📅 Would you like to schedule a dental checkup?'
    } else if (msg.includes('anxiety') || msg.includes('depression') || msg.includes('stress') || msg.includes('mental') || msg.includes('panic') || msg.includes('insomnia') || msg.includes('sleep') || msg.includes('mood') || msg.includes('sad')) {
      return 'Mental health matters just as much as physical health! 🧠💚 Anxiety, depression, or sleep issues are real concerns.\n\n👨⚕️ Our doctors can provide support, counseling, and treatment options.\n\n📅 Would you like to talk to a professional? You\'re not alone in this!'
    } else if (msg.includes('who') || msg.includes('what are you') || msg.includes('api') || msg.includes('gpt') || msg.includes('create')) {
      return '👨💻 I\'m FastAI, created by Neeraj! He built this entire FastDoc platform using MERN stack and developed me as an AI health assistant to help you book appointments and find doctors. 😊\n\nI\'m here to make your healthcare journey easier!'
    } else if (msg.includes('are you ai') || msg.includes('are you robot') || msg.includes('are you human') || msg.includes('are you real') || msg.includes('bot')) {
      return '🤖 Yes, I\'m an AI assistant created by Neeraj! But I\'m specially trained to help with healthcare. I can understand your health concerns and connect you with real doctors 24/7.\n\nThink of me as your health buddy who never sleeps! 😊 How can I help you today?'
    } else if (msg.includes('what can you do') || msg.includes('what you do') || msg.includes('your job') || msg.includes('capabilities') || msg.includes('features')) {
      return '💪 Here\'s what I can do for you:\n\n✅ Understand your symptoms & suggest specialists\n✅ Book appointments instantly\n✅ Answer health questions 24/7\n✅ Find the right doctor for you\n✅ Provide health tips & advice\n✅ Help with lab tests & checkups\n✅ Manage your appointments\n\nI\'m basically your personal health assistant! What do you need help with?'
    } else if (msg.includes('different') || msg.includes('special') || msg.includes('unique') || msg.includes('why you') || msg.includes('why prescripto')) {
      return '🌟 What makes us different?\n\n✨ 100+ verified specialist doctors\n✨ Instant online consultations\n✨ 24/7 AI health assistant (that\'s me!)\n✨ Affordable & transparent pricing\n✨ Easy appointment booking\n✨ Lab tests & imaging services\n✨ Complete health records management\n\nWe make healthcare simple, accessible, and stress-free! Want to experience it?'
    } else if (msg.includes('trust') || msg.includes('safe') || msg.includes('reliable') || msg.includes('genuine') || msg.includes('fake')) {
      return '✅ Absolutely trustworthy! Here\'s why:\n\n🩺 All doctors are verified professionals\n🔒 Your data is completely secure\n⭐ Thousands of satisfied patients\n💯 Transparent pricing, no hidden costs\n📱 Easy to use platform\n\nYour health and privacy are our top priorities! Ready to book an appointment?'
    } else if (msg.includes('better than') || msg.includes('compare') || msg.includes('vs') || msg.includes('other app')) {
      return '🏆 We focus on what matters most:\n\n✓ Real verified doctors, not just listings\n✓ Instant AI assistance (me!) 24/7\n✓ Quick appointment booking\n✓ Affordable consultations\n✓ Complete healthcare services\n✓ User-friendly experience\n\nTry us once and see the difference! Want to book an appointment?'
    } else if (msg.includes('understand') || msg.includes('smart') || msg.includes('intelligent') || msg.includes('learn')) {
      return '🧠 I\'m trained to understand:\n\n✓ Your symptoms in simple language\n✓ Health concerns & questions\n✓ Casual conversation (I\'m friendly!)\n✓ Medical terms & conditions\n✓ Urgency levels\n\nJust talk to me naturally! I\'ll understand and help you. What\'s on your mind?'
    } else if (msg.includes('language') || msg.includes('hindi') || msg.includes('english') || msg.includes('speak')) {
      return '🗣️ I understand English and can help you in simple, easy-to-understand language!\n\nNo need for medical jargon - just tell me what\'s bothering you in your own words. I\'ll get it! 😊'
    } else if (msg.includes('free') || msg.includes('charge') || msg.includes('payment') || msg.includes('pay')) {
      return '💰 Talking to me is FREE! 😊\n\nDoctor consultations have affordable fees, and we accept:\n✓ Online payments\n✓ Insurance\n✓ Cash on delivery\n\nYour health is priceless, but our services are affordable! Want to know consultation fees?'
    } else if (msg.includes('cancel') || msg.includes('reschedule') || msg.includes('change appointment')) {
      return '📅 Yes! You can easily:\n\n✓ Cancel appointments\n✓ Reschedule to another time\n✓ Change doctors\n✓ View all your bookings\n\nFlexibility is important! Need help managing your appointments?'
    } else if (msg.includes('prescription') || msg.includes('medicine list') || msg.includes('medical record')) {
      return '📋 After consultation, you\'ll get:\n\n✓ Digital prescription\n✓ Medicine list\n✓ Test recommendations\n✓ Follow-up advice\n✓ Medical records saved\n\nEverything in one place! Want to book a consultation?'
    } else if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('later')) {
      return 'Goodbye! 👋 Take care of your health! I\'m here 24/7 whenever you need me. Stay healthy! 😊'
    } else if (msg.includes('ok') || msg.includes('okay') || msg.includes('hmm') || msg.includes('ohh') || msg.includes('i see')) {
      return 'Got it! 😊 Is there anything else you\'d like to know? I\'m here to help with any health concerns or questions!'
    } else if (msg.includes('maybe') || msg.includes('not sure') || msg.includes('thinking') || msg.includes('confused')) {
      return 'No worries! Take your time. 😊 If you have any questions or need help deciding, I\'m right here. What\'s on your mind?'
    } else if (msg.includes('later') || msg.includes('tomorrow') || msg.includes('next week')) {
      return 'Sure! You can come back anytime. 😊 But remember, health issues shouldn\'t wait too long. I\'ll be here 24/7 when you\'re ready!'
    } else if (msg.includes('sorry') || msg.includes('my bad') || msg.includes('mistake')) {
      return 'No need to apologize! 😊 I\'m here to help, not judge. Feel free to ask anything. What can I do for you?'
    } else if (msg.includes('wow') || msg.includes('cool') || msg.includes('nice') || msg.includes('impressive')) {
      return 'Thank you! 😊 We try our best to make healthcare easy and accessible. Want to experience our services?'
    } else if (msg.includes('lol') || msg.includes('haha') || msg.includes('😂') || msg.includes('😄')) {
      return '😄 Glad I could make you smile! Laughter is good for health too! Now, is there anything health-related I can help you with?'
    } else if (msg.includes('wait') || msg.includes('hold on') || msg.includes('one sec')) {
      return 'Take your time! ⏰ I\'m not going anywhere. I\'ll be right here when you\'re ready. 😊'
    } else if (msg.includes('really') || msg.includes('seriously') || msg.includes('for real')) {
      return 'Yes, absolutely! 💯 Everything I say is genuine. We\'re here to help you with real healthcare solutions. Any questions?'
    } else if (msg.includes('why') || msg.includes('how come') || msg.includes('reason')) {
      return 'Good question! 🤔 I\'m here to provide answers. What specifically would you like to know about? Your health concern, our services, or something else?'
    } else if (msg.includes('idk') || msg.includes('don\'t know') || msg.includes('no idea') || msg.includes('dunno')) {
      return 'That\'s okay! 😊 That\'s exactly why I\'m here - to help you figure things out. Tell me what\'s bothering you, and I\'ll guide you!'
    } else if (msg.includes('whatever') || msg.includes('anything') || msg.includes('something')) {
      return 'Alright! 😊 How about we start with this: Are you feeling okay? Any health concerns? Or just want to know about our services?'
    } else if (msg.includes('nah') || msg.includes('nope') || msg.includes('no thanks') || msg.includes('not now')) {
      return 'No problem! 😊 I\'m here whenever you need me. Your health matters, so don\'t hesitate to reach out anytime. Take care! 👋'
    } else if (msg.includes('yep') || msg.includes('yeah') || msg.includes('yup') || msg.includes('sure')) {
      return 'Great! 😊 So what would you like help with? Tell me your health concern or what you need!'
    } else if (msg.includes('please') || msg.includes('pls') || msg.includes('kindly')) {
      return 'Of course! 😊 I\'m happy to help. What do you need assistance with?'
    } else if (msg.includes('fast') || msg.includes('quick') || msg.includes('hurry') || msg.includes('asap')) {
      return '⚡ I understand you need quick help! Tell me what\'s wrong, and I\'ll get you connected to a doctor ASAP. What\'s the issue?'
    } else if (msg.includes('problem') || msg.includes('issue') || msg.includes('trouble') || msg.includes('wrong')) {
      return 'I\'m here to help! 🤝 Tell me what\'s troubling you - whether it\'s a health issue or a question about our services. I\'ll sort it out!'
    } else if (msg.includes('again') || msg.includes('repeat') || msg.includes('what') || msg.includes('huh')) {
      return 'Let me explain again! 😊 I\'m FastAI, your health assistant. I help you book doctor appointments, answer health questions, and guide you to the right specialist. What do you need?'
    } else if (msg.includes('mom') || msg.includes('dad') || msg.includes('mother') || msg.includes('father') || msg.includes('parents')) {
      return '👨👩 Parents\' health is important! We have experienced doctors for all age-related health issues. Want to book an appointment for them?'
    } else if (msg.includes('friend') || msg.includes('someone i know')) {
      return '👥 You can book appointments for friends and family too! Just provide their details during booking. Want to help them get healthcare?'
    } else if (msg.includes('pain killer') || msg.includes('painkiller') || msg.includes('medicine name')) {
      return '⚠️ I can\'t prescribe medicines, but our doctors can! They\'ll prescribe the right medication after proper diagnosis. Want to consult a doctor?'
    } else if (msg.includes('home remedy') || msg.includes('natural cure') || msg.includes('ayurvedic')) {
      return '🌿 Home remedies can help, but for proper treatment, consulting a doctor is important! Our doctors can suggest both modern and natural treatments. Interested?'
    }
    // Day 2: Respiratory diseases
    else if (msg.includes('asthma') || msg.includes('breathing problem') || msg.includes('wheezing') || msg.includes('shortness of breath')) {
      return '😮‍💨 Asthma and breathing problems need proper management! Our doctors can prescribe inhalers, medications, and breathing exercises.\n\n📅 Want to consult a respiratory specialist?'
    } else if (msg.includes('bronchitis') || msg.includes('chest congestion') || msg.includes('phlegm') || msg.includes('mucus')) {
      return '🫁 Bronchitis causes chest congestion and persistent cough. Our doctors can prescribe antibiotics if needed and suggest remedies.\n\n📅 Need a consultation?'
    } else if (msg.includes('pneumonia') || msg.includes('lung infection') || msg.includes('chest pain breathing')) {
      return '⚠️ Pneumonia is serious! Chest pain with breathing, high fever, and cough need immediate attention.\n\n📅 Please consult our doctor urgently!'
    } else if (msg.includes('tuberculosis') || msg.includes('tb') || msg.includes('persistent cough') || msg.includes('night sweats')) {
      return '🩺 TB symptoms include persistent cough, night sweats, and weight loss. Early detection is crucial!\n\n📅 Our doctors can order tests and start treatment. Book now?'
    } else if (msg.includes('allergy') || msg.includes('allergic') || msg.includes('hay fever') || msg.includes('pollen')) {
      return '🤧 Allergies can be managed! Whether it\'s pollen, dust, or food allergies, our doctors can prescribe antihistamines and identify triggers.\n\n📅 Want an allergy consultation?'
    }
    // Cardiovascular issues
    else if (msg.includes('high bp') || msg.includes('hypertension') || msg.includes('blood pressure high')) {
      return '💔 High blood pressure is a silent killer! Regular monitoring and medication are essential.\n\n📅 Our doctors can help manage your BP. Book a checkup?'
    } else if (msg.includes('low bp') || msg.includes('hypotension') || msg.includes('blood pressure low') || msg.includes('dizziness standing')) {
      return '😵 Low BP causes dizziness and fatigue. Our doctors can identify the cause and suggest treatment.\n\n📅 Need a consultation?'
    } else if (msg.includes('cholesterol') || msg.includes('lipid') || msg.includes('triglycerides') || msg.includes('ldl') || msg.includes('hdl')) {
      return '🧈 High cholesterol increases heart disease risk! Diet, exercise, and medication can control it.\n\n📅 Want to check your cholesterol levels?'
    } else if (msg.includes('heart attack') || msg.includes('cardiac arrest') || msg.includes('chest tightness')) {
      return '🚨 EMERGENCY! If you\'re having chest pain, tightness, or suspect heart attack, call ambulance immediately!\n\nFor heart health checkups, our doctors are available 24/7.'
    } else if (msg.includes('irregular heartbeat') || msg.includes('palpitation') || msg.includes('arrhythmia') || msg.includes('heart racing')) {
      return '💓 Irregular heartbeat needs evaluation! Our doctors can order ECG and prescribe medication if needed.\n\n📅 Book a cardiac consultation?'
    } else if (msg.includes('varicose veins') || msg.includes('leg swelling') || msg.includes('edema')) {
      return '🦵 Varicose veins and leg swelling can indicate circulation issues. Our doctors can suggest treatment options.\n\n📅 Want a consultation?'
    }
    // Bone and joint problems
    else if (msg.includes('osteoporosis') || msg.includes('weak bones') || msg.includes('bone density')) {
      return '🦴 Weak bones increase fracture risk! Calcium, vitamin D, and exercise help. Our doctors can order bone density tests.\n\n📅 Need a checkup?'
    } else if (msg.includes('rheumatoid') || msg.includes('ra') || msg.includes('joint inflammation') || msg.includes('stiff joints')) {
      return '🤕 Rheumatoid arthritis causes joint pain and stiffness. Early treatment prevents damage!\n\n📅 Our doctors can prescribe medications. Book now?'
    } else if (msg.includes('gout') || msg.includes('uric acid') || msg.includes('toe pain')) {
      return '🦶 Gout causes severe toe/joint pain due to high uric acid. Diet changes and medication help!\n\n📅 Want to consult a doctor?'
    } else if (msg.includes('sciatica') || msg.includes('leg pain radiating') || msg.includes('lower back pain leg')) {
      return '😣 Sciatica causes shooting pain from back to leg. Physiotherapy and medication provide relief!\n\n📅 Need treatment?'
    } else if (msg.includes('slip disc') || msg.includes('herniated disc') || msg.includes('disc bulge')) {
      return '💢 Slip disc causes severe back pain! Our doctors can suggest treatment - from medication to surgery if needed.\n\n📅 Book a consultation?'
    } else if (msg.includes('frozen shoulder') || msg.includes('shoulder stiffness') || msg.includes('cant move shoulder')) {
      return '🤷 Frozen shoulder limits movement! Physiotherapy and exercises help restore mobility.\n\n📅 Want treatment guidance?'
    } else if (msg.includes('carpal tunnel') || msg.includes('wrist pain') || msg.includes('hand numbness') || msg.includes('tingling fingers')) {
      return '✋ Carpal tunnel syndrome causes wrist pain and numbness. Common in computer users!\n\n📅 Our doctors can suggest exercises and treatment. Need help?'
    }
    // Infections
    else if (msg.includes('malaria') || msg.includes('dengue') || msg.includes('chikungunya') || msg.includes('mosquito fever')) {
      return '🦟 Mosquito-borne diseases need immediate attention! High fever, body ache, and weakness are warning signs.\n\n📅 Get tested and treated quickly. Book now?'
    } else if (msg.includes('typhoid') || msg.includes('enteric fever') || msg.includes('prolonged fever')) {
      return '🤒 Typhoid causes prolonged fever and weakness. Blood tests confirm it. Treatment is essential!\n\n📅 Need a consultation?'
    } else if (msg.includes('jaundice') || msg.includes('yellow eyes') || msg.includes('yellow skin') || msg.includes('hepatitis')) {
      return '🟡 Jaundice (yellow eyes/skin) indicates liver issues. Hepatitis or other causes need treatment!\n\n📅 Consult our doctor immediately?'
    } else if (msg.includes('uti') || msg.includes('urinary infection') || msg.includes('burning urination') || msg.includes('frequent urination')) {
      return '🚽 UTI causes burning and frequent urination. Antibiotics cure it quickly!\n\n📅 Don\'t ignore it - book a consultation?'
    } else if (msg.includes('kidney stone') || msg.includes('renal calculi') || msg.includes('severe back pain') || msg.includes('blood in urine')) {
      return '💎 Kidney stones cause severe pain! Our doctors can suggest treatment - from medication to procedures.\n\n📅 Need urgent help?'
    } else if (msg.includes('appendicitis') || msg.includes('appendix pain') || msg.includes('right lower abdomen pain')) {
      return '⚠️ Appendicitis causes severe right lower abdomen pain! This is an emergency - may need surgery.\n\n📅 Consult immediately!'
    } else if (msg.includes('gallstone') || msg.includes('gallbladder') || msg.includes('right upper abdomen pain')) {
      return '💚 Gallstones cause right upper abdomen pain after eating. Treatment ranges from diet to surgery.\n\n📅 Need evaluation?'
    } else if (msg.includes('hernia') || msg.includes('bulge abdomen') || msg.includes('groin bulge')) {
      return '🔴 Hernia causes a bulge in abdomen/groin. Surgery is often needed to fix it.\n\n📅 Want to consult a surgeon?'
    } else if (msg.includes('piles') || msg.includes('hemorrhoids') || msg.includes('anal pain') || msg.includes('bleeding stool')) {
      return '🩸 Piles/hemorrhoids cause pain and bleeding. Treatment available - from creams to procedures!\n\n📅 Don\'t be embarrassed - our doctors handle this daily. Book?'
    } else if (msg.includes('fissure') || msg.includes('anal fissure') || msg.includes('pain passing stool')) {
      return '😖 Anal fissure causes severe pain during bowel movements. Treatment helps healing!\n\n📅 Consult our doctor for relief?'
    } else if (msg.includes('fistula') || msg.includes('anal fistula') || msg.includes('pus discharge')) {
      return '⚕️ Fistula needs surgical treatment. Our doctors can evaluate and suggest the best approach.\n\n📅 Book a consultation?'
    } else if (msg.includes('book') || msg.includes('appointment')) {
      return 'I\'d be happy to help you book an appointment! 📅\n\nHere\'s how it works:\n1️⃣ Browse our 100+ verified doctors\n2️⃣ Choose your preferred specialist\n3️⃣ Select a convenient time slot\n4️⃣ Confirm your booking\n\nWould you like to see our available doctors now?'
    } else if (msg.includes('doctor') || msg.includes('specialist')) {
      return 'We have an amazing team of 100+ verified doctors! 👨⚕️\n\n🩺 General Physician\n👶 Pediatricians\n🧠 Neurologists\n💊 Dermatologists\n🤰 Gynecologists\n💔 Gastroenterologists\n\nWhich specialty are you looking for? Or tell me your symptoms and I\'ll suggest the right doctor!'
    } else if (msg.includes('thank')) {
      return 'You\'re very welcome! 😊 I\'m always here to help. Feel free to ask me anything else about your health or our services. Take care! ❤️'
    } else if (msg.includes('tip') || msg.includes('health')) {
      return '💡 Here are some essential health tips:\n\n✅ Drink 8 glasses of water daily\n✅ Exercise for 30 minutes each day\n✅ Get 7-8 hours of quality sleep\n✅ Eat balanced, nutritious meals\n✅ Practice stress management\n✅ Regular health checkups\n\nWould you like personalized advice from our doctors? 😊'
    } else {
      return 'Hey there! 👋 I\'m FastAI, your friendly AI health assistant!\n\nI can help you with:\n\n🏥 Book appointments with 100+ specialists\n👨⚕️ Find the right doctor for you\n💊 Get health advice & symptom guidance\n📋 Manage your appointments\n🔬 Lab tests & imaging services\n💉 Vaccinations & checkups\n💬 24/7 health support\n\nJust tell me what you need! 😊'
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
                <h3 className='font-bold text-lg'>FastAI</h3>
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
