import { AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Successfull = () => {
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()
  const user = auth.currentUser
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  })

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        setIsError(error.message)
      })
  }

  if (!user) return null
  console.log(auth.currentUser)
  return (
    <main className='flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-bl from-emerald-500 to-emerald-900'>
      <div className='flex flex-col w-[300px] md:w-[450px] bg-gray-100 rounded-2xl p-[20px] md:p-[50px] shadow-lg justify-between'>
        <h2 className=' font-bold text-3xl text-center top-0 mb-4 px-4'>
          Landing Page
        </h2>
        <button
          onClick={handleLogOut}
          className={`flex justify-center items-center shadow-md py-3 px-4 rounded-3xl text-white bg-gradient-to-r from-emerald-600 to-emerald-900 hover:opacity-70 transition duration-700 ease-in-out`}>
          <AiOutlineLogout size={20} /> <p className='pl-2'>Log out</p>
        </button>
        {isError && (
          <p className='text-sm text-red-500 w-[350px] md:w-[450px]'>
            {isError}
          </p>
        )}
      </div>
    </main>
  )
}

export default Successfull
