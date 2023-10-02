import { useState, useEffect } from 'react'
import { SlUser } from 'react-icons/sl'
import { TfiLock } from 'react-icons/tfi'
import { handleLogin } from '../../firebase.ts'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase.ts'

const initialFormData = {
  email: '',
  password: '',
}

const Login = () => {
  const navigation = useNavigate()
  const [status, setStatus] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  // Listening for the user to be logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigation('/landing-page')
    })
  }, [])

  // handle inputs change and from submit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const regex = /^[A-Za-z0-9\-_@.]*$/
    if (value.length < 25 && regex.test(value)) {
      setFormData({
        ...formData,
        [name]: value.trim(),
      })
    }
  }

  const forgotPass = () => {
    navigation('/recover-password')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      handleLogin(formData.email, formData.password)
    } catch (err: any) {
      setStatus('Wrong Email or Password')
    }
  }

  const handleRegister = () => {
    navigation('/register')
  }

  // Disabled button handle
  const isDisabled = !(
    formData.password.length >= 6 && formData.email.length >= 8
  )

  return (
    <main className='flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-bl from-emerald-500 to-emerald-900'>
      <div className='relative flex flex-col w-[300px] md:w-[450px] bg-gray-100 rounded-2xl  px-[30px] py-[40px] md:py-[60px] md:px-[40px] shadow-lg justify-between '>
        <h2 className=' font-bold text-3xl text-center top-0 mb-4 px-4'>
          Login
        </h2>
        <div>
          <div className='text-gray-400 focus-within:text-emerald-600 transition-colors duration-500'>
            <label htmlFor='user' className='text-left text-sm pt-2'>
              Username:
            </label>
            <div className='flex items-center border-b-[1px] border-gray-400 focus-within:border-emerald-600'>
              <SlUser size={15} className='mb-1' />
              <input
                onChange={handleInputChange}
                value={formData.email}
                data-testid='emailInput'
                id='email'
                name='email'
                placeholder='Type your Email'
                className='px-2 pb-1 bg-transparent focus:outline-none'
              />
            </div>
          </div>
          <div className='text-gray-400 focus-within:text-emerald-600 transition-colors duration-500 mt-2'>
            <label htmlFor='pass' className='text-left text-sm  pt-2'>
              Password:
            </label>
            <div className='flex items-center border-b-[1px] border-gray-400 focus-within:border-emerald-600'>
              <TfiLock size={15} className='mb-1' />
              <input
                onChange={handleInputChange}
                type='password'
                value={formData.password}
                data-testid='passInput'
                id='pass'
                name='password'
                placeholder='Type your Password'
                className='px-2 pb-1 bg-transparent focus:outline-none'
              />
            </div>
          </div>
          <p
            onClick={forgotPass}
            data-testid='forgot'
            className='text-right text-sm hover:text-emerald-600  transition-colors duration-500 cursor-pointer py-1'>
            Forgot password?
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          data-testid='login-btn'
          className={`mt-4 py-3 px-4 rounded-3xl text-white bg-gradient-to-r from-emerald-600 to-emerald-900 shadow-md ${
            isDisabled ? 'opacity-[0.5]' : 'opacity-[1] hover:opacity-80'
          } transition duration-700 ease-in-out`}>
          Login
        </button>
        <div className='flex j my-2 justify-center items-center'>
          <hr className='border-0 h-[1px] mx-3 bg-gray-400 w-[30%]' />
          <p>or</p>
          <hr className='border-0 h-[1px] mx-3 bg-gray-400 w-[30%]' />
        </div>
        <button
          onClick={handleRegister}
          data-testid='sign-up-btn'
          className={` py-3 px-4 rounded-3xl text-white bg-gradient-to-r from-emerald-600 to-emerald-900 
             hover:opacity-80 transition duration-700 ease-in-out cursor-pointer shadow-md`}>
          Sign up
        </button>
        <p className='text-sm text-center'>
          Sign up if you don't have an account.
        </p>
        {status && (
          <p className='text-sm text-red-700 mt-2 text-center font-bold'>
            {status}
          </p>
        )}
      </div>
    </main>
  )
}

export default Login
