import React from 'react'
import { useDispatch } from 'react-redux'

// ACTIONS
import { deleteReview } from '../actions'

const DeleteCommentModal = (props) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteReview(props.review.id))
  }
  return(
    <div className='delete_modal'>
      <form onSubmit={handleSubmit}>
        Are you sure you want to delete this comment?
        <button type='submit'>Yes</button>
        <button onClick={()=>props.setDeleting(false)}>No</button>
      </form>
    </div>
  )
}

export default DeleteCommentModal;