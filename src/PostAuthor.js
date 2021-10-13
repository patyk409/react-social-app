import React from 'react'
import './PostAuthor.css'

const PostAuthor = (props) => {
  /*
   * jsx
   */
  return (
    <div className='post-author'>
      <img
        src={props.post.user.avatar_url}
        alt='user_avatar'
        className='post-author__img'
      />
      <div>
        <p className='post-author__name'>{props.post.user.username}</p>
        <span className='post-author__email'>{props.post.user.email}</span>
      </div>
      {props.userToken &&
      props.post.user.username !== localStorage.getItem('name') ? (
        <div
          className='unfollow-icon'
          onClick={() => {
            props.unfollowUser(props.post.user.id)
          }}
          tabIndex='0'
        >
          <i className='fas fa-minus post-author__unfollow-icon'></i>
        </div>
      ) : null}
    </div>
  )
}

export default PostAuthor
