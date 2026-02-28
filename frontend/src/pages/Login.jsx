import { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/exportAppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useProgress } from "../context/ProgressContext";

const Login = () => {

  const [state, setState] = useState('Sign Up');
  const { startProgress, completeProgress } = useProgress();
  const { backendURL, fetchUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signUp, setSignUp] = useState({
    email: '',
    name: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      startProgress();
      if (state === 'Log In') {

        const response = await axios.post(backendURL + '/api/user/login', signUp, { withCredentials: true });

        if (response.data.success) {
          fetchUser();
          navigate('/');
          toast.success(response.data.msg)
          completeProgress()
        }
      }
      else if (state === 'Sign Up') {
        const response = await axios.post(backendURL + '/api/user/register', signUp, { withCredentials: true });

        if (response.data.success) {
          fetchUser();
          navigate('/');
          toast.success(response.data.msg)
          completeProgress();
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      completeProgress();
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#5f6FFF] via-purple-500 to-pink-500'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
      </div>

      <form className='relative z-10 fade-in-up w-full max-w-md' onSubmit={onSubmitHandler}>
        <div className='bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='relative inline-block mb-4'>
              <div className='w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center text-4xl shadow-lg transform hover:rotate-12 transition-transform duration-300'>
                {state === 'Sign Up' ? '🚀' : '👋'}
              </div>
              <div className='absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse'></div>
            </div>
            <h1 className='text-4xl font-bold mb-2'>
              <span className='gradient-text'>{state === 'Sign Up' ? 'Join Us' : 'Welcome Back'}</span>
            </h1>
            <p className='text-gray-600'>Your health journey starts here</p>
          </div>

          {/* Form Fields */}
          <div className='space-y-5'>
            {
              state === 'Sign Up' &&
              <div className='group'>
                <label className='text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2'>
                  <span>👤</span> Full Name
                </label>
                <input 
                  className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#5f6FFF] focus:ring-4 focus:ring-[#5f6FFF]/10 transition-all duration-300 outline-none' 
                  autoComplete="name" 
                  type="text" 
                  onChange={onChangeHandler} 
                  value={signUp.name} 
                  name='name' 
                  placeholder='John Doe'
                  required 
                />
              </div>
            }
            
            <div className='group'>
              <label className='text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2'>
                <span>📧</span> Email Address
              </label>
              <input 
                className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#5f6FFF] focus:ring-4 focus:ring-[#5f6FFF]/10 transition-all duration-300 outline-none' 
                autoComplete="email" 
                type="email" 
                onChange={onChangeHandler} 
                value={signUp.email} 
                name='email' 
                placeholder='you@example.com'
                required 
              />
            </div>
            
            <div className='group'>
              <label className='text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2'>
                <span>🔒</span> Password
              </label>
              <div className='relative'>
                <input 
                  className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#5f6FFF] focus:ring-4 focus:ring-[#5f6FFF]/10 transition-all duration-300 outline-none pr-12' 
                  autoComplete="password" 
                  type={showPassword ? 'text' : 'password'} 
                  onChange={onChangeHandler} 
                  value={signUp.password} 
                  name='password' 
                  placeholder='••••••••'
                  required 
                />
                <button 
                  type='button' 
                  onClick={() => setShowPassword(!showPassword)} 
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5f6FFF] transition-colors duration-300'
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type='submit' 
            disabled={!signUp.email || !signUp.password} 
            className='w-full mt-8 py-4 gradient-bg text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group'
          >
            <span className='relative z-10 flex items-center justify-center gap-2'>
              {state === 'Sign Up' ? '✨ Create Account' : '🚀 Login Now'}
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
          </button>

          {/* Toggle State */}
          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type='button'
                onClick={() => setState(state === 'Sign Up' ? 'Log In' : 'Sign Up')} 
                className='ml-2 text-[#5f6FFF] font-bold hover:underline'
              >
                {state === 'Sign Up' ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Social Proof */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <div className='flex items-center justify-center gap-8 text-sm text-gray-600'>
              <div className='text-center'>
                <div className='font-bold text-[#5f6FFF] text-xl'>100+</div>
                <div>Doctors</div>
              </div>
              <div className='w-px h-10 bg-gray-300'></div>
              <div className='text-center'>
                <div className='font-bold text-[#5f6FFF] text-xl'>1000+</div>
                <div>Patients</div>
              </div>
              <div className='w-px h-10 bg-gray-300'></div>
              <div className='text-center'>
                <div className='font-bold text-[#5f6FFF] text-xl'>4.9★</div>
                <div>Rating</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
