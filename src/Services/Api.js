import { setPosts, setTotalPosts } from '../toolkitRedux/toolkitSlice'

const basePath = 'https://blog.kata.academy/api'

export const getPosts =
  (offset = 0) =>
  async (dispatch) => {
    const token = window.localStorage.getItem('token')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
    try {
      const res = await fetch(`${basePath}/articles/?offset=${offset}&limit=5`, options)
      const { articles, articlesCount } = await res.json()

      dispatch(setPosts(articles))
      dispatch(setTotalPosts(articlesCount))
    } catch (e) {
      throw new Error(e)
    }
  }

export const registerUser = async (data) => {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${basePath}/users`, params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((res) => res.errors))
  })
}

export const loginUser = async (data) => {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return fetch(`${basePath}/users/login`, params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((resp) => resp.errors))
  })
}

export const getUser = async (token) => {
  const params = {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/user`, params).then((response) => response.json())
}

export const editUser = async (data) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${basePath}/user`, params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((err) => err.errors))
  })
}

export const addPost = async (data) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${basePath}/articles`, params)
}

export const editPost = async (data, slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${basePath}/articles/${slug}`, params)
}

export const deletePost = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}`, params)
}

export const setLike = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}/favorite`, params).then((res) => res.json())
}

export const deleteLike = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}/favorite`, params).then((res) => res.json())
}
