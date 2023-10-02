import { AiOutlineMail } from 'react-icons/ai'
import { useState } from 'react'
import { passwordReset } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
type status = {
  error?: string
  message?: string
}

const ForgotPass = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<status | null>(null)
  const [email, setEmail] = useState('')

  const handlePasswordRecovery = async () => {
    setStatus(null)
    const response = await passwordReset(email)
    setEmail('')
    setStatus(response)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z0-9\-_@.]*$/
    if (e.target.value.length < 25 && regex.test(e.target.value))
      setEmail(e.target.value)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <main className='flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-bl from-emerald-500 to-emerald-900'>
      <div className='relative flex flex-col w-[300px] md:w-[450px] bg-gray-100 rounded-2xl  px-[30px] py-[40px] md:py-[60px] md:px-[40px] shadow-lg justify-between'>
        <h2
          className=' font-bold text-2xl md:text-3xl text-center top-0 mb-2 md:mb-4 px-4'
          data-testid='forgot-pass'>
          Reset Password
        </h2>

        <div className='text-gray-400 focus-within:text-emerald-600 transition-colors duration-500 px-1'>
          <label htmlFor='user' className='text-left text-sm pt-2'>
            Username:
          </label>
          <div className='flex items-center border-b-[1px] border-gray-400 focus-within:border-emerald-600'>
            <AiOutlineMail size={15} className='mb-1' />
            <input
              onChange={handleInputChange}
              value={email}
              data-testid='emailInput'
              id='email'
              name='email'
              placeholder='Type your Email'
              className='px-2 pb-1 bg-transparent focus:outline-none'
            />
          </div>
        </div>

        <button
          onClick={handlePasswordRecovery}
          className={`mt-6 flex justify-center items-center shadow-md py-3 px-4 rounded-3xl text-white bg-gradient-to-r from-emerald-600 to-emerald-900 hover:opacity-70 transition duration-700 ease-in-out`}>
          Reset Password
        </button>
        {status?.error ? (
          <p className='text-sm text-red-500  text-center py-2'>
            {status.error}
          </p>
        ) : (
          <p className='text-sm text-emerald-600 text-center  py-2'>
            {status?.message}
          </p>
        )}

        <div
          onClick={handleBack}
          className='absolute bottom-[30px] left-[30px] md:left-[50px] md:bottom-[40px] ] md:text-base flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-500 cursor-pointer '>
          <IoMdArrowBack size={15} className='mr-[2px]' /> back
        </div>
      </div>
    </main>
  )
}

export default ForgotPass
