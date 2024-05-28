import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sign-In.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { loginUser } from '../../Services/Api'
import { loginStatus } from '../../toolkitRedux/userSlice'

function SignIn() {
  const [error, setError] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = async (data) => {
    try {
      await loginUser({
        user: {
          email: data.email,
          password: data.password,
        },
      }).then(({ user }) => {
        window.localStorage.setItem('token', user.token)
        window.localStorage.setItem('isLogged', true)
        dispatch(loginStatus(true))
        navigate('/')
      })
    } catch (e) {
      setError(e)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  return (
    <div className="form-page">
      <div className="form form__sign-in">
        <p className="form__title">Sign in</p>
        <form className="form__inputs" onSubmit={handleSubmit(submit)}>
          <label htmlFor="email">Email address</label>
          <input
            className={`email-input ${(errors.email?.message || error['email or password']) && 'invalid'}`}
            id="email"
            placeholder="Email address"
            name="email"
            type="mail"
            autoComplete="off"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              },
            })}
          />
          <p className="validation"> {errors.email?.message || error['email or password']} </p>
          <label htmlFor="password">Password</label>
          <input
            className={`password-input ${(errors.password?.message || error['email or password']) && 'invalid'}`}
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="off"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          <p className="validation"> {errors.password?.message || error['email or password']}</p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="login-sign">
          Do not have an account?{' '}
          <Link to="/sign-up" className="login-link">
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
