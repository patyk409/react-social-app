import React, { useContext } from 'react'
import { GlobalContext } from './CreateContext'
import './DownbarInfo.css'

const DownbarInfo = () => {
  const [downbarContent] = useContext(GlobalContext)

  console.log(downbarContent)
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
