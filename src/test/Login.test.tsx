import { describe, it } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Successfull from '../components/Successful'
import ForgotPass from '../components/ForgotPass'

describe('testing render of App component', () => {
  it('simple render test', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const emailInput = screen.getByTestId('emailInput')
    const passInput = screen.getByTestId('passInput')
    const signBtn = screen.getByTestId('sign-up-btn')
    const LognBtn = screen.getByTestId('login-btn')
    expect(emailInput).toBeInTheDocument()
    expect(passInput).toBeInTheDocument()
    expect(signBtn).toBeInTheDocument()
    expect(LognBtn).toBeInTheDocument()
  })
})

describe('testing if inputs change corectly', () => {
  it('check logics', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const emailInput: HTMLInputElement = screen.getByTestId('emailInput')
    const passInput: HTMLInputElement = screen.getByTestId('passInput')

    fireEvent.change(emailInput, { target: { value: 'my-test@123.pl' } })
    fireEvent.change(passInput, { target: { value: 'qqqwww' } })
    expect(emailInput.value).toBe('my-test@123.pl')
    expect(passInput.value).toBe('qqqwww')
  })
})

describe('testing button disables functionality.', () => {
  it('check logics', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const emailInput: HTMLInputElement = screen.getByTestId('emailInput')
    const passInput: HTMLInputElement = screen.getByTestId('passInput')
    const LognBtn = screen.getByTestId('login-btn')
    //pass is to short
    fireEvent.change(emailInput, { target: { value: 'user@op.pl' } })
    fireEvent.change(passInput, { target: { value: 'qqqvv' } })
    expect(LognBtn).toBeDisabled()
    //email is to short
    fireEvent.change(emailInput, { target: { value: 'u@o2.pl' } })
    fireEvent.change(passInput, { target: { value: 'qqqvvv' } })
    expect(LognBtn).toBeDisabled()
    //both inputs are correct
    fireEvent.change(emailInput, { target: { value: 'user@op.pl' } })
    fireEvent.change(passInput, { target: { value: 'qqqvvv' } })
    expect(LognBtn).not.toBeDisabled()
  })
})

describe('testing if sign-up button work correctly', () => {
  it('check logics', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </MemoryRouter>
    )

    const signBtn = screen.getByTestId('sign-up-btn')
    fireEvent.click(signBtn)
    expect(screen.getByTestId('register')).toBeVisible()
    history.back()
    expect(window.location.pathname).toBe('/')
  })
})

describe('testing if forgot-pas button work correctly', () => {
  it('check logics', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/recover-password' element={<ForgotPass />} />
        </Routes>
      </MemoryRouter>
    )

    const forgotBtn = screen.getByTestId('forgot')
    fireEvent.click(forgotBtn)
    expect(screen.getByTestId('forgot-pass')).toBeVisible()
    history.back()
    expect(window.location.pathname).toBe('/')
  })
})
