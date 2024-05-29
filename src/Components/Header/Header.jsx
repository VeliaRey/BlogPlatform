import React, { useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from '../../Services/Api'
import { loginStatus, userInfo } from '../../toolkitRedux/userSlice'

export default function Header() {
  const isLogged = window.localStorage.getItem('isLogged')
  const { isLoggedIn, currentUser } = useSelector((state) => state.user)
  const { username, image } = currentUser
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.setItem('isLogged', false)
    dispatch(loginStatus(false))
  }

  useEffect(() => {
    if (isLogged === 'true') {
      const token = window.localStorage.getItem('token')
      getUser(token).then((res) => {
        dispatch(userInfo(res.user))
      })
      dispatch(loginStatus(true))
    }
  }, [isLogged, dispatch])

  return (
    <header className="header">
      <Link to="/articles" className="header__logo">
        Realworld blog
      </Link>
      {!isLoggedIn && (
        <>
          <Link to="/sign-in" className="header__sign-in">
            Sign In
          </Link>
          <Link to="/sign-up" className="header__sign-up">
            Sign Up
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/new-article" className="header__article">
            Create article
          </Link>
          <Link to="/profile" className="header__user">
            <p className="user__nickname header__nickname">{username}</p>
            <img className="info__avatar" src={image} alt="" />
          </Link>
          <Link to="/" className="header__logout" onClick={logout}>
            Log Out
          </Link>
        </>
      )}
    </header>
  )
}
