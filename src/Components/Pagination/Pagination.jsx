import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { useDispatch } from 'react-redux'

import './Pagination.css'
import { request } from '../../Store/ArticlesReducer'

const Pagi = () => {
  const dispatch = useDispatch()
  const { articlesCount } = useSelector((state) => state.articles)

  const onSelectedPage = (page) => {
    let offset = page * 5 - 5
    dispatch(request(offset))
  }

  return (
    <div className="pagination">
      <Pagination total={articlesCount} onChange={onSelectedPage} />
    </div>
  )
}

export default Pagi
