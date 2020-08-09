import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// ACTIONS
import { editReviewAction } from '../actions'

const EditCommentModal = ({ originalReview, setEditing, user_id }) => {
  const dispatch = useDispatch()
  const restaurantInfo = useSelector(state => state.reviewsReducer)
  const [editHover, setEditHover] = useState(0)
  const [editReview, setEditReview] = useState({})

  const handleEditChanges = (e) => {
    if(e.target.name === 'edit_rating'){
      setEditReview({...editReview, rating:Number(e.target.value)})
    }else{
      setEditReview({...editReview, [e.target.name]:e.target.value})
    }
  }

  const handleEditHoverChanges = (e, newHover) => {
    setEditHover(newHover)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    dispatch(editReviewAction(originalReview.id, editReview, restaurantInfo.restaurant_id, setEditing, user_id))
  }

  return(
    <div className='edit_modal'>
      <form style={{border:'2px solid blue'}} onSubmit={handleEditSubmit}>
        <h4>Edit your review</h4>
        <div style={{display:'flex'}}>
          <Rating
            name="edit_rating"
            precision={0.5}
            value={editReview.rating ? editReview.rating: originalReview.rating}
            onChange={handleEditChanges}
            onChangeActive={handleEditHoverChanges}
          />
          <Typography component="legend">
            {<span style={{ fontWeight: "bold" }}>{editHover > 0 ? editHover : editReview.rating ? editReview.rating: originalReview.rating}</span>}
          </Typography>
        </div>
        <input
          type='text'
          name='review'
          onChange={handleEditChanges}
          value={editReview.review ? editReview.review: originalReview.review}
        />
        <button>Edit Review</button>
        <button onClick={()=>setEditing(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default EditCommentModal;