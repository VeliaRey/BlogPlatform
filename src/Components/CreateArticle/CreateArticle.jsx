import React, { useState } from 'react'
import './CreateArticle.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

import { addPost } from '../../Services/Api'

function CreateArticle() {
  const [tagList, setTagList] = useState([])
  const [tagValue, setTagValue] = useState('')

  const navigate = useNavigate()

  const handleAddTag = (e) => {
    e.preventDefault()
    setTagList([...tagList, tagValue])
    setTagValue('')
  }

  const handleClickDeleteTag = (e, id) => {
    e.preventDefault()
    setTagList(tagList.filter((arg, index) => index !== id))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const submit = async (data) => {
    await addPost({
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: [...tagList, tagValue],
      },
    })
    navigate('/')
  }

  return (
    <div className="new-article-page">
      <div className="new-article">
        <h1 className="new-article__title">Create new article</h1>
        <form className="new-article__form" onSubmit={handleSubmit(submit)}>
          <label htmlFor="title">
            {' '}
            Title
            <input
              id="title"
              name="title"
              placeholder="Title"
              {...register('title', {
                required: 'title is a required field',
              })}
            />
            <p className="validation"> {errors.title?.message} </p>
          </label>

          <label htmlFor="description">
            {' '}
            Short description
            <input
              id="description"
              name="description"
              placeholder="Short description"
              {...register('description', {
                required: 'description is a required field',
              })}
            />
            <p className="validation"> {errors.description?.message} </p>
          </label>

          <label htmlFor="text">
            {' '}
            Text
            <textarea
              className="text-label"
              id="text"
              name="text"
              placeholder="Text"
              {...register('text', {
                required: 'text is a required field',
              })}
            />
            <p className="validation"> {errors.text?.message} </p>
          </label>

          <label htmlFor="tags">
            {' '}
            Tags
            {tagList &&
              tagList.map((item, id) => (
                <div key={nanoid()} className="tags">
                  <input className="tags-label" id={nanoid()} defaultValue={item} placeholder="Tags" disabled />
                  <button type="button" className="tags__button" onClick={(e) => handleClickDeleteTag(e, id)}>
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
              <button type="button" className="tags__button tags__button-add" onClick={(e) => handleAddTag(e)}>
                Add tag
              </button>
            </div>
          </label>

          <button className="form__button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateArticle
