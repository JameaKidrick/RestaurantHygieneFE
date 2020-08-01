import React from 'react'
import { useDispatch } from 'react-redux'

// ACTIONS
import { deleteReview } from '../actions'

// STYLING
import Rating from "@material-ui/lab/Rating";

const DeleteCommentModal = ({ review, formatDate, setDeleting }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteReview(review.id, review.restaurant_id, setDeleting))
  }

  return(
    <div className='delete_modal'>
      <form onSubmit={handleSubmit}>
        Are you sure you want to delete this comment?
        <div>
          <br/>
          <div>{review.username}</div>
          <div>{formatDate(review.created_at)}</div>
          <Rating
            name="restaurant_rating"
            defaultValue={review.rating}
            precision={0.1}
            readOnly
          />
          <div>{review.review}</div>
        </div>
        <button type='submit'>Yes</button>
        <button onClick={()=>setDeleting(false)}>No</button>
      </form>
    </div>
  )
}

export default DeleteCommentModal;