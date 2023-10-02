import { useState } from 'react'
import { SlUser } from 'react-icons/sl'
import { TfiLock } from 'react-icons/tfi'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineMail } from 'react-icons/ai'
import { registration } from '../../firebase.ts'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const [isError, setIsError] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  const handleBack = () => {
    navigate('/')
  }
  // handle inputs change and from submit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const regex = /^[A-Za-z0-9\-_@.\s]*$/
    if (value.length < 25 && regex.test(value)) {
      const newValue = name === 'fullName' ? value : value.trim()
      setFormData({
        ...formData,
        [name]: newValue,
      })
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      registration(formData.fullName, formData.email, formData.password)
    } catch (err: any) {
      setIsError(err.message)
    }
  }

  // Disabled button handle
  const isDisabled = !(
    formData.password.length >= 6 && formData.email.length >= 6
  )

  return (
    <main className='flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-bl from-emerald-500 to-emerald-900'>
      <form className='relative flex flex-col w-[300px] md:w-[450px] bg-gray-100 rounded-2xl px-[20px] py-[40px] md:p-[50px] shadow-lg justify-between'>
        <h2
          className=' font-bold text-3xl text-center top-0 mb-4 px-4 '
          data-testid='register'>
          Register
        </h2>
        <div className='text-gray-500 focus-within:text-emerald-600'>
          <label htmlFor='pass' className='text-left text-sm '>
            Full Name:
          </label>
          <div className='flex items-center border-b-[1px] border-gray-400 mb-2  focus-within:border-emerald-600'>
            <SlUser size={15} />
            <input
              onChange={handleInputChange}
              value={formData.fullName}
              data-testid='nameInput'
              id='name'
              name='fullName'
              placeholder='Type your Full Name'
              className='px-2 pb-2 bg-transparent focus:outline-none'
            />
          </div>
        </div>
        <div className='text-gray-500 focus-within:text-emerald-600'>
          <label htmlFor='user' className='text-left text-sm  pt-2'>
            Email:
          </label>
          <div className='flex items-center border-b-[1px] border-gray-400 mb-2  focus-within:border-emerald-600'>
            <AiOutlineMail size={15} />
            <input
              onChange={handleInputChange}
              value={formData.email}
              data-testid='emailInput'
              id='email'
              name='email'
              placeholder='Type your Username'
              className='px-2 pb-2 bg-transparent focus:outline-none'
            />
          </div>
        </div>
        <div className='text-gray-500 focus-within:text-emerald-600'>
          <label htmlFor='pass' className='text-left text-sm  pt-2'>
            Password:
          </label>
          <div className='flex items-center border-b-[1px] border-gray-400 mb-6  focus-within:border-emerald-600'>
            <TfiLock size={15} />
            <input
              onChange={handleInputChange}
              type='password'
              value={formData.password}
              data-testid='passInput'
              id='pas'
              name='password'
              placeholder='Type your Password'
              className='px-2 pb-2 bg-transparent focus:outline-none'
            />
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={isDisabled}
          data-testid='login-btn'
          className={`py-3 px-4 rounded-3xl text-white bg-gradient-to-r from-emerald-600 to-emerald-900 ${
            isDisabled ? 'opacity-[0.5]' : 'opacity-[1] hover:opacity-70'
          } transition duration-700 ease-in-out`}>
          Sign up
        </button>
        {isError && (
          <p className='text-sm text-red-500  text-center py-2'>{isError}</p>
        )}
        <div
          onClick={handleBack}
          className='absolute bottom-[15px] left-[20px] md:left-[50px] md:bottom-[40px] md:text-base flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-500 cursor-pointer'>
          <IoMdArrowBack size={15} className='mr-[2px]' /> back
        </div>
      </form>
    </main>
  )
}

export default Login
