import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import ForgotPass from './components/ForgotPass'
import Register from './components/Register'
import Successful from './components/Successful'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recover-password' element={<ForgotPass />} />
        <Route path='/landing-page' element={<Successful />} />
      </Routes>
    </>
  )
}

export default App
