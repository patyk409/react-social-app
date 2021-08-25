import React from "react";
import "./Dashboard.css";
import moment from 'moment';

const Dashboard = props => {
  /*
   * jsx
   */
  return (
    <aside className="Dashboard">
      <div className="Dashboard-profile">

        <header className="Dashboard-header">
          <h3>Your profile</h3>
          <i className="far fa-id-card"></i>
        </header>

        <div className="Profile">
          <img src={props.profileAvatar} alt="profile_avatar" className="Profile-avatar" />
          <p className="Profile-name">{props.profileName}</p>
          <p className="Profile-email">{props.profileEmail}</p>
        </div>

        <div className="Dashboard-input-container">
          <input
            type="text"
            placeholder="write some post"
            value={props.postContent}
            onChange={event => props.setPostContent(event.target.value)} />

          <button
            className="Dashboard-button"
            onClick={props.addPost}>
            <i className="fas fa-pen-alt"></i>
          </button>

          {props.searchedPostTrigger ?
            <div className="Searched-post-result" >
              <ul className="Result-list">

                {props.searchedPostResult.length === 0 ?
                  <p className="Searched-post-info">{props.searchedPostInfo}</p> :
                  props.searchedPostResult.map(post => {
                    return (
                      <li className="Result-list-item" key={post.id}>
                        <div className="Searched-post-data">
                          <img src={post.user.avatar_url} alt="user_avatar" />

                          <div>
                            <p>{post.user.username}</p>
                            <span>{moment(post.created_at).fromNow()}</span>
                          </div>

                          <div className="Like-container">
                            <span>{post.likes.length}</span>
                            <i className={post.likes.filter(like => like.username === localStorage.getItem("name")).length > 0 ? "far fa-grin-wink Post-liked" : "far fa-grin-wink"} onClick={(event) => {
                              if (!event.target.classList.contains("Post-liked")) {
                                event.target.classList.add("Post-liked");
                                props.postLike(post.id);
                              } else {
                                event.target.classList.remove("Post-liked");
                                props.postDislike(post.id);
                              }
                            }} tabIndex="0"></i>
                          </div>

                          <div className="Follow-icon" onClick={() => { props.unfollowUser(post.user.id) }} tabIndex="0">
                            <i className="fas fa-minus"></i>
                          </div>
                        </div>
                        <p className="Post-content">{post.content}</p>
                      </li>
                    )
                  })}

              </ul>
            </div> : null}

          {props.searchedPostTrigger ?
            <div className="Post-result-closer" onClick={() => { props.searchedPostCloser() }}>
              <i className="fas fa-times"></i>
            </div> : null}
        </div>

        <div className="Dashboard-input-container">
          <input
            type="date"
            value={props.postBrowserByDate}
            onChange={event => props.setPostBrowserByDate(event.target.value)} />

          <button
            className="Dashboard-button"
            onClick={props.searchPost}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="Dashboard-users">

        <header className="Dashboard-header">
          <h3>You may follow</h3>
          <i className="fas fa-users"></i>
        </header>

        <ul className="Users-recommended">
          {props.recommendedUsers.map(user => {
            return (
              <li className="Users" key={user.id}>
                <img src={user.avatar_url} alt="user_avatar" className="User-avatar" />
                <div className="User-data">
                  <p className="User-name">{user.username}</p>
                  <p className="User-email">{user.email}</p>
                </div>

                <div className="Follow-icon" onClick={() => { props.followUser(user.id) }} tabIndex="0">
                  <i className="fas fa-plus"></i>
                </div>
              </li>
            )
          })}
        </ul>

        <header className="Dashboard-header">
          <h3>Space Club</h3>
          <i className="fas fa-user-astronaut"></i>
        </header>

        <div className="Dashboard-input-container">
          <input
            type="text"
            placeholder="search user by name"
            value={props.friendBrowserByName}
            onChange={event => props.setFriendBrowserByName(event.target.value)} />

          <button
            className="Dashboard-button"
            onClick={props.searchFriendByName}>
            <i className="fas fa-user-alt"></i>
          </button>

          {props.searchedUserTrigger ?
            <div className="Searched-user-result">

              {!props.searchedUserInfo ?
                <div className="User-result">
                  <img src={props.searchedAvatar} alt="user_avatar" className="User-avatar" />
                  <div className="User-data">
                    <p className="User-name">{props.searchedName}</p>
                    <p className="User-email">{props.searchedEmail}</p>
                  </div>

                  <div className="Follow-icon" onClick={() => { props.followUser(props.searchedUserId) }} tabIndex="0">
                    <i className="fas fa-plus"></i>
                  </div>
                </div> : null}

              {props.searchedUserInfo ?
                <p className="Searched-user-info">{props.searchedUserInfo}</p> : null}
            </div> : null}

          {props.searchedUserTrigger ?
            <div className="User-result-closer" onClick={() => { props.setSearchedUserTrigger(false) }}>
              <i className="fas fa-times"></i>
            </div> : null}
        </div>

        <div className="Dashboard-input-container">
          <input
            type="email"
            placeholder="search user by email"
            value={props.friendBrowserByEmail}
            onChange={event => props.setFriendBrowserByEmail(event.target.value)} />

          <button
            className="Dashboard-button"
            onClick={props.searchFriendByEmail}>
            <i className="fas fa-at"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Dashboard;
