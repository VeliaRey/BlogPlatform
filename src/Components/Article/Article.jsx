import React from 'react'
import './Article.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Tag } from 'antd'
import { format } from 'date-fns'

import limitText from '../../utils/LimitText'
import { setLike, deleteLike, getPosts } from '../../Services/Api'

function Article({
  title,
  desc,
  tags,
  slug,
  username,
  avatar,
  favorited,
  favoritesCount,
  currentPage,
  createdAt,
  updatedAt,
}) {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.user)

  const handleClick = async () => {
    await setLike(slug)

    await dispatch(getPosts(5 * currentPage - 5))
  }

  const handleDelete = async () => {
    await deleteLike(slug)
    await dispatch(getPosts(5 * currentPage - 5))
  }

  const createTime = (date) => format(new Date(date), 'MMMM dd, yyyy')

  return (
    <div className="article">
      <div className="article__content">
        <div className="content__title">
          <Link to={`/articles/${slug}`} className="title__text">
            {limitText(title, 50)}
          </Link>
          {favorited && isLoggedIn ? (
            <button label="button" type="button" disabled={!isLoggedIn} onClick={() => handleDelete()}>
              <HeartFilled className="liked" />
            </button>
          ) : (
            <button label="button" type="button" disabled={!isLoggedIn} onClick={() => handleClick()}>
              <HeartOutlined />
            </button>
          )}
          <p className="title__likes">{favoritesCount}</p>
        </div>

        <div className="content__tags">
          {tags.map((tag) => (tag && tag.length ? <Tag key={nanoid()}>{tag}</Tag> : null))}
        </div>
        <p className="content__preview">{limitText(desc, 220)}</p>
      </div>
      <div className="article__info">
        <div className="info__user">
          <p className="user__nickname">{username}</p>
          <p className="user__date">
            {updatedAt === createdAt ? <> {createTime(createdAt)} </> : <> {createTime(updatedAt)} </>}
          </p>
        </div>
        <img src={avatar} alt="avatar" className="info__avatar" />
      </div>
    </div>
  )
}
export default Article
