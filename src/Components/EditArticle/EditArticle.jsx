import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

import { editPost } from '../../Services/Api'

function EditArticle() {
  const [tagList, setTagList] = useState([])
  const [tagValue, setTagValue] = useState('')
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const handleAddTag = () => {
    if (tagValue) {
      setTagList([...tagList, tagValue])
      setTagValue('')
    }
  }

  const handleClickDeleteTag = (e, id) => {
    e.preventDefault()
    setTagList(tagList.filter((tag, index) => index !== id))
  }

  const handleTagChange = (e, index) => {
    const updatedTags = [...tagList]
    updatedTags[index] = e.target.value
    setTagList(updatedTags)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const submit = async (data) => {
    const finalTagList = tagValue ? [...tagList, tagValue] : tagList

    await editPost(
      {
        article: {
          title: data.title,
          description: data.description,
          body: data.text,
          tagList: finalTagList,
        },
      },
      slug
    )
    navigate('/')
  }

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then(async (data) => {
        await setPost(data.article)
        await setTagList(data.article.tagList)
      })
  }, [slug])

  return (
    <div className="new-article-page">
      {post && (
        <div className="new-article">
          <h1 className="new-article__title">Edit article</h1>
          <form className="new-article__form" onSubmit={handleSubmit(submit)}>
            <label htmlFor="title">
              Title
              <input
                id="title"
                name="title"
                placeholder="Title"
                defaultValue={post.title}
                {...register('title', {
                  required: 'Title is a required field',
                })}
              />
              <p className="validation">{errors.title?.message}</p>
            </label>

            <label htmlFor="description">
              Short description
              <input
                id="description"
                name="description"
                placeholder="Short description"
                defaultValue={post.description}
                {...register('description', {
                  required: 'Description is a required field',
                })}
              />
              <p className="validation">{errors.description?.message}</p>
            </label>

            <label htmlFor="text">
              Text
              <textarea
                className="text-label"
                id="text"
                name="text"
                placeholder="Text"
                defaultValue={post.body}
                {...register('text', {
                  required: 'Text is a required field',
                })}
              />
              <p className="validation">{errors.text?.message}</p>
            </label>

            <label htmlFor="tags">
              Tags
              {tagList.map((item, index) => (
                <div key={nanoid()} className="tags">
                  <input
                    className="tags-label"
                    id={`tag-${index}`}
                    value={item}
                    onChange={(e) => handleTagChange(e, index)}
                    placeholder="Tag"
                  />
                  <button type="button" className="tags__button" onClick={(e) => handleClickDeleteTag(e, index)}>
                    Delete
                  </button>
                </div>
              ))}
              <div className="tags">
                <input
                  className="tags-label"
                  id="tags"
                  name="tags"
                  placeholder="Tag"
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                />
                <button type="button" className="tags__button tags__button-add" onClick={handleAddTag}>
                  Add tag
                </button>
              </div>
            </label>

            <button className="form__button" type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default EditArticle
