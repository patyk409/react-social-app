import React, { useContext } from 'react'
import { GlobalContext } from '../../../../tools/CreateContext'
import './SearchedUser.css'

const SearchedUser = (props) => {
  // GLOBAL CONTEXT
  const { setSearchedUserTrigger } = useContext(GlobalContext)

  return (
    <>
      <div className="searched-user-result">
        {props.usersInputInfo ? (
          <div className="searched-user-result__info-box">
            <p className="searched-user-result__info">
              {props.usersInputInfo}
            </p>
          </div>
        ) : (
          <div className="searched-user-result__searched-user">
            <img
              src={props.searchedUserAvatar}
              alt="user_avatar"
              className="searched-user-result__searched-user-avatar"
            />
            <div className="searched-user-result__searched-user-data">
              <p className="searched-user-data__name">
                {props.searchedUserName}
              </p>
              <p className="searched-user-data__email">
                {props.searchedUserEmail}
              </p>
            </div>

            <div
              className="follow-icon"
              onClick={() => {
                props.followUser(props.searchedUserId)
              }}
              tabIndex="0"
            >
              <i className="fas fa-plus searched-user__follow-icon"></i>
            </div>
          </div>
        )}
      </div>

      <div
        className="Dashboard-searchedUserResult-closer"
        onClick={() => {
          setSearchedUserTrigger(false)
        }}
      >
        <i className="fas fa-times Dashboard-searchedUserResult-closerIcon"></i>
      </div>
    </>
  )
}

export default SearchedUser
