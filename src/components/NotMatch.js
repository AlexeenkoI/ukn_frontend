import React from 'react'
import { Link } from 'react-router-dom'

export default function NotMatch() {
  return (
    <div>
      Страница не найдена.
      <Link to="/">На главную</Link>
    </div>
  )
}

