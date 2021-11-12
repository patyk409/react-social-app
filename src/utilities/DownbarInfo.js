import React, { useContext } from 'react'
import '../styles/utilities/DownbarInfo.scss'

import { GlobalContext } from '../tools/CreateContext'

const DownbarInfo = () => {
  // GLOBAL CONTEXT
  const { downbarContent } = useContext(GlobalContext)

  // JSX
  return (
    <aside
      className={
        downbarContent.includes('added') ||
        downbarContent.includes('in') ||
        downbarContent.includes('up')
          ? 'downbar-container downbar-bg-green'
          : 'downbar-container downbar-bg-orange'
      }
    >
      <p className="downbar-content">{downbarContent}</p>
    </aside>
  )
}

export default DownbarInfo
