import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { editUser } from '../../Services/Api'
import { userInfo } from '../../toolkitRedux/userSlice'

function EditProfile() {
  const { currentUser } = useSelector((state) => state.user)
  const { username, image, email } = currentUser

  const [error, setError] = useState({})

  const dispatch = useDispatch()

  const submit = async (data) => {
    try {
      await editUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          image: data.image,
        },
      }).then((res) => {
        dispatch(userInfo(res.user))
      })
    } catch (e) {
      setError(() => e)
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
      <div className="form form__edit">
        <p className="form__title">Edit profile</p>
        <form className="form__inputs" onSubmit={handleSubmit(submit)}>
          <label htmlFor="username">Username</label>
          <input
            className={`username-input ${(errors.username?.message || error.username) && 'invalid'}`}
            id="username"
            placeholder="Username"
            name="username"
            autoComplete="off"
            defaultValue={username}
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
            defaultValue={email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              },
            })}
          />
          <p className="validation"> {errors.email?.message || error.email} </p>
          <label htmlFor="password">New password</label>
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

          <label htmlFor="password">Avatar image (url)</label>
          <input
            className="password-input"
            id="avatar"
            placeholder="Avatar image"
            name="avatar"
            autoComplete="off"
            defaultValue={image}
            {...register('image')}
          />
          <button className="login-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
export default EditProfile
