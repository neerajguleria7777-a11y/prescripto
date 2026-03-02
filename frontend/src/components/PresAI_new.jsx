// Additional conversational responses to add after line 95 (after greetings section)

// Casual conversation
else if (msg.includes('how are you') || msg.includes('how r u') || msg.includes('whats up') || msg.includes('wassup')) {
  return 'I\'m doing great, thanks for asking! 😊 More importantly, how are YOU feeling today? Is there anything health-related I can help you with?'
} else if (msg.includes('your name') || msg.includes('ur name')) {
  return 'I\'m PresAI! 🤖 Think of me as your friendly neighborhood health assistant. I\'m here 24/7 to help you with appointments, doctor recommendations, and health advice. What can I do for you today?'
} else if (msg.includes('joke') || msg.includes('funny')) {
  return '😄 Here\'s one: Why did the doctor carry a red pen? In case they needed to draw blood! 😂\n\nBut seriously, is there anything health-related I can help you with today?'
} else if (msg.includes('weather') || msg.includes('rain') || msg.includes('sunny')) {
  return 'I wish I could check the weather for you! ☀️🌧️ But I\'m specialized in health matters. However, staying healthy in any weather is important!\n\nIs there anything health-related you need help with?'
} else if (msg.includes('food') || msg.includes('recipe') || msg.includes('cook') || msg.includes('eat')) {
  return 'Food is so important for health! 🍎🥗 While I don\'t have recipes, I can tell you that a balanced diet is key to staying healthy.\n\nIf you have specific dietary concerns or need nutrition advice, our doctors can help! Want to book a consultation?'
} else if (msg.includes('gym') || msg.includes('workout') || msg.includes('exercise') || msg.includes('fitness') || msg.includes('weight loss') || msg.includes('fat')) {
  return 'Fitness goals! 💪🏋️ That\'s awesome! Exercise is great for health, but it\'s important to do it right.\n\nOur doctors can guide you on safe workout routines, diet plans, and weight management. Want professional advice?'
} else if (msg.includes('work') || msg.includes('job') || msg.includes('office') || msg.includes('boss')) {
  return 'Work stress is real! 💼😓 Many people face work-related health issues like stress, anxiety, or burnout.\n\nOur doctors can help with stress management and mental health support. Would you like to schedule a consultation?'
} else if (msg.includes('study') || msg.includes('exam') || msg.includes('college') || msg.includes('school')) {
  return 'Student life can be stressful! 📚😰 Exam pressure, irregular sleep, and stress are common issues.\n\nTaking care of your health is crucial for good performance. Need help with stress management or health checkups?'
} else if (msg.includes('travel') || msg.includes('trip') || msg.includes('vacation')) {
  return 'Travel sounds exciting! ✈️🌍 Don\'t forget to stay healthy while traveling!\n\nNeed travel vaccinations, health checkups before your trip, or travel health advice? Our doctors can help prepare you for a safe journey!'
} else if (msg.includes('bored') || msg.includes('boring')) {
  return 'Feeling bored? 😅 Well, taking care of your health doesn\'t have to be boring!\n\nHow about scheduling a health checkup? Prevention is better than cure! Want me to help you book an appointment?'
} else if (msg.includes('busy') || msg.includes('no time')) {
  return 'I totally understand being busy! ⏰ But your health should never take a backseat.\n\nThat\'s why we offer quick online consultations that fit your schedule. Just 15-20 minutes can make a big difference! Interested?'
} else if (msg.includes('expensive') || msg.includes('cost') || msg.includes('price') || msg.includes('cheap')) {
  return 'I understand budget concerns! 💰 Healthcare should be accessible to everyone.\n\nWe offer affordable consultation fees and various payment options. Your health is an investment, not an expense! Want to know more?'
} else if (msg.includes('scared') || msg.includes('afraid') || msg.includes('fear') || msg.includes('nervous')) {
  return 'It\'s completely normal to feel nervous about health issues! 😟 But avoiding them only makes things worse.\n\nOur doctors are very understanding and will make you feel comfortable. Can I help you schedule a consultation?'
} else if (msg.includes('happy') || msg.includes('great') || msg.includes('awesome') || msg.includes('good')) {
  return 'That\'s wonderful to hear! 😊🎉 Staying happy and positive is great for your health!\n\nKeep up the good vibes! And remember, regular health checkups help you stay this way. Anything I can help you with today?'
} else if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('serious') || msg.includes('help me')) {
  return '🚨 If this is a medical emergency, please call emergency services immediately or visit the nearest hospital!\n\nFor urgent but non-emergency consultations, I can help you book a priority appointment with our doctors right away. What\'s the situation?'
}
