import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
  // JSX
  return (
    <div
      className={
        props.isVisible
          ? 'preloader-container preloader--active'
          : 'preloader-container'
      }
    >
      <div className="preloader-container__preloader"></div>
    </div>
  )
}

export default Preloader
