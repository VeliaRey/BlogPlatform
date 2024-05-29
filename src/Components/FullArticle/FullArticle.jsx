import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import Markdown from 'react-markdown'
import './FullArticle.css'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { format } from 'date-fns'

import { setLike, deleteLike } from '../../Services/Api'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'

function FullArticle() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [likes, setLikes] = useState('')
  const { isLoggedIn, currentUser } = useSelector((state) => state.user)
  const { username } = currentUser
  const token = window.localStorage.getItem('token')

  const handleClick = async () => {
    await setLike(slug).then((res) => {
      setLikes(res.article.favoritesCount)
    })
  }

  const handleDelete = async () => {
    await deleteLike(slug).then((res) => {
      setLikes(res.article.favoritesCount)
    })
  }

  useEffect(() => {
    const params = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
    fetch(`https://blog.kata.academy/api/articles/${slug}`, params)
      .then((res) => res.json())
      .then((data) => setPost(data.article))
  }, [slug, token, likes])

  const createTime = (date) => format(new Date(date), 'MMMM dd, yyyy')

  return (
    <div className="article-list">
      {post && (
        <div className="article article-full">
          <div className="article__content">
            <div className="content__title content__title-full">
              <p className="title__text title__text-full">{post.title}</p>
              {post.favorited ? (
                <HeartFilled className="liked" onClick={() => handleDelete()} />
              ) : (
                <HeartOutlined onClick={() => handleClick()} />
              )}
              <p className="title__likes">{post.favoritesCount}</p>
            </div>

            <div className="content__tags">
              {post.tagList.map((tag) => (tag && tag.length ? <Tag key={tag}>{tag}</Tag> : null))}
            </div>
            <p className="content__preview content__preview-full">{post.description}</p>
            {/* eslint-disable-next-line */}
            <Markdown children={post.body} className="content__body" />
          </div>
          <div className="article__extra">
            <div className="article__info">
              <div className="info__user">
                <p className="user__nickname">{post.author.username}</p>
                <time className="user__date">
                  {post.updatedAt === post.createdAt ? (
                    <> {createTime(post.createdAt)} </>
                  ) : (
                    <> {createTime(post.updatedAt)} </>
                  )}
                </time>
              </div>
              <img src={post.author.image} alt="avatar" className="info__avatar" />
            </div>

            {isLoggedIn && username === post.author.username && (
              <div>
                <ConfirmDelete className="info__button" slug={slug} />
                <Link to={`/articles/${slug}/edit`} className="info__button button__edit">
                  Edit
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FullArticle
