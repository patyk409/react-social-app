import React from "react";
import "./Wall.css";
import Popup from "./Popup";
import moment from 'moment';

const Wall = props => {
  /*
   * jsx
   */
  return (
    <main className="Wall">

      <ul className="Wall-postList">
        {props.latestPosts.map(post => {
          return (
            <li className="Wall-postItem" key={post.id}>

              <div className="Wall-postItem-author">

                <img src={post.user.avatar_url} alt="user_avatar" className="Wall-postItem-author-avatar" />
                <div>
                  <p className="Wall-postItem-author-name">{post.user.username}</p>
                  <span className="Wall-postItem-author-email">{post.user.email}</span>
                </div>

                {props.userToken && post.user.username !== localStorage.getItem("name") ?
                  <div className="FollowIcon" onClick={() => { props.unfollowUser(post.user.id) }} tabIndex="0">
                    <i className="fas fa-minus Wall-postItem-unfollowIcon"></i>
                  </div> : null}

              </div>

              <p className="Wall-postItem-content">{post.content}</p>

              <div className="Wall-postItem-postInfo">

                <span className="Wall-postItem-postInfo-timeAgo">{moment(post.created_at).fromNow()}</span>

                <div className="Wall-postItem-postInfo-likeBox">
                  <span className="Wall-postItem-postInfo-likeBox-amount">{post.likes.length}</span>

                  <i className={post.likes.filter(like => like.username === localStorage.getItem("name")).length > 0 ? "far fa-heart Wall-postItem-postInfo-likeBox-icon Post-liked" : "far fa-heart Wall-postItem-postInfo-likeBox-icon"} onClick={(event) => {
                    if (!props.userToken) {
                      return null;
                    } else if (!event.target.classList.contains("Post-liked")) {
                      event.target.classList.add("Post-liked");
                      props.postLike(post.id);
                    } else {
                      event.target.classList.remove("Post-liked");
                      props.postDislike(post.id);
                    }
                  }} tabIndex="0"></i>
                </div>

              </div>

              {post.user.username === localStorage.getItem("name") &&
                <div className="Closer" onClick={() => { props.showConfirmationPopup(post.id) }} tabIndex="0">
                  <i className="fas fa-times Closer-icon"></i>
                </div>}

            </li>
          )
        })}

        {props.isVisible && props.userToken ? props.getMorePosts(props.latestPosts[(props.latestPosts.length - 1)].created_at) : null}

        {(props.confirmationPopup) ?
          <aside className="App-popup">
            <Popup
              setConfirmationPopup={props.setConfirmationPopup}
              postId={props.postId}
              deletePost={props.deletePost} />
          </aside> : null}
      </ul>

      <div className={props.isVisible ? "Preloader-container Show-preloader" : "Preloader-container"}>
        <div className="Preloader"></div>
      </div>

    </main>
  );
};

export default Wall;
