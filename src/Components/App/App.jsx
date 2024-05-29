import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import store from '../../toolkitRedux'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import SignIn from '../Sign-In/Sign-In'
import SignUp from '../Sign-Up/Sign-Up'
import EditProfile from '../EditProfile/EditProfile'
import CreateArticle from '../CreateArticle/CreateArticle'
import FullArticle from '../FullArticle/FullArticle'
import EditArticle from '../EditArticle/EditArticle'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main className="blog-platform">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<FullArticle />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route
              path="/new-article"
              element={
                <PrivateRoute>
                  {' '}
                  <CreateArticle />{' '}
                </PrivateRoute>
              }
            />
            <Route
              path="/articles/:slug/edit"
              element={
                <PrivateRoute>
                  {' '}
                  <EditArticle />{' '}
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  )
}

function PrivateRoute({ children }) {
  const isLogged = window.localStorage.getItem('isLogged')
  if (isLogged === 'true') {
    return children
  }
  return <Navigate to="/sign-in" />
}

export default App
