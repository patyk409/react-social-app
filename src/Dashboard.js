import React from 'react'
import './Dashboard.css'
import moment from 'moment'

const Dashboard = (props) => {
  /*
   * jsx
   */
  return (
    <aside className="Dashboard">
      {/*
       * dashboard -> profile
       */}
      <div className="Dashboard-profile">
        <h3 className="Dashboard-header">
          Your profile
          <i className="far fa-id-card Dashboard-headerIcon"></i>
        </h3>

        <div className="Dashboard-profile-data">
          <img
            src={props.profileAvatar}
            alt="profile_avatar"
            className="Dashboard-profile-data-avatar"
          />
          <p className="Dashboard-profile-data-name">{props.profileName}</p>
          <p className="Dashboard-profile-data-email">{props.profileEmail}</p>
        </div>

        <div className="Dashboard-inputBox">
          <input
            type="text"
            placeholder="write some post"
            value={props.postContent}
            onChange={(event) => props.setPostContent(event.target.value)}
            className="Dashboard-inputBox-textInput"
          />

          <button className="Dashboard-inputBox-button" onClick={props.addPost}>
            <i className="fas fa-pen-alt Dashboard-inputBox-buttonIcon"></i>
          </button>

          {/*
           * dashboard -> searched post result
           */}
          {props.searchedPostTrigger ? (
            <div className="Dashboard-searchedPostResult">
              <ul className="Dashboard-searchedPostResult-list">
                {props.searchedPostResult.length === 0 ? (
                  <div className="Dashboard-searchedPostResult-infoBox">
                    <p className="Dashboard-searchedPostResult-info">
                      {props.searchedPostInfo}
                    </p>
                  </div>
                ) : (
                  props.searchedPostResult.map((post) => {
                    return (
                      <li
                        className="Dashboard-searchedPostResult-listItem"
                        key={post.id}
                      >
                        <div className="Dashboard-searchedPostResult-listItem-author">
                          <img
                            src={post.user.avatar_url}
                            alt="user_avatar"
                            className="Dashboard-searchedPostResult-listItem-author-avatar"
                          />

                          <div className="Dashboard-searchedPostResult-listItem-author-data">
                            <p className="Dashboard-searchedPostResult-listItem-author-data-name">
                              {post.user.username}
                            </p>
                            <span className="Dashboard-searchedPostResult-listItem-author-data-timeAgo">
                              {moment(post.created_at).fromNow()}
                            </span>
                          </div>

                          <div className="Dashboard-searchedPostResult-listItem-likeBox">
                            <span className="Dashboard-searchedPostResult-listItem-likeBox-likeAmount">
                              {post.likes.length}
                            </span>

                            <i
                              className={
                                post.likes.filter(
                                  (like) =>
                                    like.username ===
                                    localStorage.getItem('name'),
                                ).length > 0
                                  ? 'far fa-heart Dashboard-searchedPostResult-listItem-likeBoxIcon Post-liked'
                                  : 'far fa-heart Dashboard-searchedPostResult-listItem-likeBoxIcon'
                              }
                              onClick={(event) => {
                                if (
                                  !event.target.classList.contains('Post-liked')
                                ) {
                                  event.target.classList.add('Post-liked')
                                  props.postLike(post.id)
                                } else {
                                  event.target.classList.remove('Post-liked')
                                  props.postDislike(post.id)
                                }
                              }}
                              tabIndex="0"
                            ></i>
                          </div>

                          {props.userToken &&
                          post.user.username !==
                            localStorage.getItem('name') ? (
                            <div
                              className="FollowIcon"
                              onClick={() => {
                                props.unfollowUser(post.user.id)
                              }}
                              tabIndex="0"
                            >
                              <i className="fas fa-minus Dashboard-searchedPostResult-listItem-unfollowIcon"></i>
                            </div>
                          ) : null}
                        </div>
                        <p className="Dashboard-searchedPostResult-listItem-postContent">
                          {post.content}
                        </p>
                      </li>
                    )
                  })
                )}
              </ul>
            </div>
          ) : null}

          {props.searchedPostTrigger ? (
            <div
              className="Dashboard-searchedPostResult-closer"
              onClick={() => {
                props.searchedPostCloser()
              }}
            >
              <i className="fas fa-times Dashboard-searchedPostResult-closerIcon"></i>
            </div>
          ) : null}
        </div>

        <div className="Dashboard-inputBox">
          <input
            type="date"
            value={props.postBrowserByDate}
            onChange={(event) => props.setPostBrowserByDate(event.target.value)}
            className="Dashboard-inputBox-textInput"
          />

          <button
            className="Dashboard-inputBox-button"
            onClick={props.searchedPostResultHandler}
          >
            <i className="fas fa-search Dashboard-inputBox-buttonIcon"></i>
          </button>
        </div>
      </div>

      {/*
       * dashboard -> users
       */}
      <div className="Dashboard-users">
        <h3 className="Dashboard-header">
          You may follow
          <i className="fas fa-users Dashboard-headerIcon"></i>
        </h3>

        <ul className="Dashboard-users-recommendedUsersList">
          {props.recommendedUsers.map((user) => {
            return (
              <li
                className="Dashboard-users-recommendedUsersItem"
                key={user.id}
              >
                <img
                  src={user.avatar_url}
                  alt="user_avatar"
                  className="Dashboard-users-recommendedUsersItem-avatar"
                />
                <div className="Dashboard-users-recommendedUsersItem-data">
                  <p className="Dashboard-users-recommendedUsersItem-data-name">
                    {user.username}
                  </p>
                  <p className="Dashboard-users-recommendedUsersItem-data-email">
                    {user.email}
                  </p>
                </div>

                <div
                  className="FollowIcon"
                  onClick={() => {
                    props.followUser(user.id)
                  }}
                  tabIndex="0"
                >
                  <i className="fas fa-plus Dashboard-users-recommendedUsersItem-followIcon"></i>
                </div>
              </li>
            )
          })}
        </ul>

        <h3 className="Dashboard-header">
          Social Club
          <i className="fas fa-icons Dashboard-headerIcon"></i>
        </h3>

        <div className="Dashboard-inputBox">
          <input
            type="text"
            placeholder="search user by name"
            value={props.friendBrowserByName}
            onChange={(event) =>
              props.setFriendBrowserByName(event.target.value)
            }
            className="Dashboard-inputBox-textInput"
          />

          <button
            className="Dashboard-inputBox-button"
            onClick={props.searchFriendByName}
          >
            <i className="fas fa-user-alt Dashboard-inputBox-buttonIcon"></i>
          </button>

          {/*
           * dashboard -> searched user result
           */}
          {props.searchedUserTrigger ? (
            <div className="Dashboard-searchedUserResult">
              {!props.searchedUserInfo ? (
                <div className="Dashboard-searchedUserResult-user">
                  <img
                    src={props.searchedAvatar}
                    alt="user_avatar"
                    className="Dashboard-searchedUserResult-user-avatar"
                  />
                  <div className="Dashboard-searchedUserResult-user-data">
                    <p className="Dashboard-searchedUserResult-user-data-name">
                      {props.searchedName}
                    </p>
                    <p className="Dashboard-searchedUserResult-user-data-email">
                      {props.searchedEmail}
                    </p>
                  </div>

                  <div
                    className="FollowIcon"
                    onClick={() => {
                      props.followUser(props.searchedUserId)
                    }}
                    tabIndex="0"
                  >
                    <i className="fas fa-plus Dashboard-searchedUserResult-user-followIcon"></i>
                  </div>
                </div>
              ) : null}

              {props.searchedUserInfo ? (
                <div className="Dashboard-searchedUserResult-infoBox">
                  <p className="Dashboard-searchedUserResult-info">
                    {props.searchedUserInfo}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {props.searchedUserTrigger ? (
            <div
              className="Dashboard-searchedUserResult-closer"
              onClick={() => {
                props.setSearchedUserTrigger(false)
              }}
            >
              <i className="fas fa-times Dashboard-searchedUserResult-closerIcon"></i>
            </div>
          ) : null}
        </div>

        <div className="Dashboard-inputBox">
          <input
            type="email"
            placeholder="search user by email"
            value={props.friendBrowserByEmail}
            onChange={(event) =>
              props.setFriendBrowserByEmail(event.target.value)
            }
            className="Dashboard-inputBox-textInput"
          />

          <button
            className="Dashboard-inputBox-button"
            onClick={props.searchFriendByEmail}
          >
            <i className="fas fa-at Dashboard-inputBox-buttonIcon"></i>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Dashboard
