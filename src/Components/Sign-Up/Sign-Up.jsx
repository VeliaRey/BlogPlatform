import React, { useState } from 'react'
import './Sign-Up.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { registerUser } from '../../Services/Api'

function SignUp() {
  const [error, setError] = useState({})

  const submit = async (data) => {
    try {
      await registerUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      })
    } catch (e) {
      setError(() => e)
    }
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  return (
    <div className="form-page">
      <div className="form">
        <p className="form__title">Create new account</p>
        <form className="form__inputs" onSubmit={handleSubmit(submit)}>
          <label htmlFor="username">Username</label>
          <input
            className={`username-input ${(errors.username?.message || error.username) && 'invalid'}`}
            id="username"
            placeholder="Username"
            name="username"
            autoComplete="off"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Your username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your username must be less than 20 characters',
              },
            })}
          />
          <p className="validation"> {errors.username?.message || error.username} </p>

          <label htmlFor="email">Email address</label>
          <input
            className={`email-input ${(errors.email?.message || error.email) && 'invalid'}`}
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
          <p className="validation"> {errors.email?.message || error.email} </p>
          <label htmlFor="password">Password</label>
          <input
            className={`password-input ${(errors.password?.message || error.password) && 'invalid'}`}
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="off"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password must be less than 40 characters',
              },
            })}
          />
          <p className="validation"> {errors.password?.message || error.password} </p>
          <label htmlFor="repeat">Repeat password</label>
          <input
            className={`repeat-input ${errors.repeat?.message && 'invalid'}`}
            id="repeat"
            placeholder="Repeat password"
            name="repeat"
            type="password"
            autoComplete="off"
            {...register('repeat', {
              required: 'Confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
          />
          <p className="validation"> {errors.repeat?.message} </p>
          <label className="agreement">
            <input
              className="agreement-input"
              id="agreement"
              name="agreement"
              type="checkbox"
              {...register('agreement', {
                required: 'You should confirm the agreement',
              })}
            />
            <p className="agreement-text">I agree to the processing of my personal information</p>
          </label>
          <p className="validation"> {errors.agreement?.message} </p>
          <button type="submit" className="login-button">
            Create
          </button>
        </form>
        <p className="login-sign">
          Already have an account?{' '}
          <Link to="/sign-in" className="login-link">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  )
}
export default SignUp
