import React from 'react'
import { Button, message, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'

import { deletePost } from '../../Services/Api'

function ConfirmDelete({ slug }) {
  const navigate = useNavigate()

  const confirm = async () => {
    await deletePost(slug)
    navigate('/')
    message.success('Article was successfully deleted')
  }

  return (
    <Popconfirm
      title="Delete the article"
      description="Are you sure to delete this article?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
      placement="right"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  )
}

export default ConfirmDelete
