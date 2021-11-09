import React, { useContext } from 'react'
import './DownbarInfo.css'

import { GlobalContext } from '../tools/CreateContext'

const DownbarInfo = () => {
  const { downbarContent } = useContext(GlobalContext)
  return (
    <aside
      className={
        downbarContent.includes('added') ||
        downbarContent.includes('in') ||
        downbarContent.includes('up')
          ? 'app-message app-message--green'
          : 'app-message app-message--red'
      }
    >
      <p className="app-message__content">{downbarContent}</p>
    </aside>
  )
}

export default DownbarInfo
