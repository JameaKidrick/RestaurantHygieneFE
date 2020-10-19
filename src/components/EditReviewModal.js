import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// ACTIONS
import { editReviewAction } from '../actions'

// STYLES
import { ModalContainer } from '../styles/modalStyling'
import { Button, DeleteButton, Input, TextArea } from '../styles/formStyling'

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
    <ModalContainer className="overlay">
      <form id='modalForm' onSubmit={handleEditSubmit}>
        <p>Edit your review</p>
        <div className='reviewContainer'>
          <Rating
            name="edit_rating"
            id='ratingStars'
            precision={0.5}
            value={editReview.rating ? editReview.rating: originalReview.rating}
            onChange={handleEditChanges}
            onChangeActive={handleEditHoverChanges}
          />
          <p className='ratingScore'>{editHover > 0 ? editHover : editReview.rating ? editReview.rating: originalReview.rating}</p>
        </div>
        <TextArea
          type='text'
          name='review'
          onChange={handleEditChanges}
          value={editReview.review ? editReview.review: originalReview.review}
        />
        <div className='buttonContainer'>
          <DeleteButton type='submit'>Edit Review</DeleteButton>
          <Button onClick={()=>setEditing(false)}>Cancel</Button>
        </div>
      </form>
    </ModalContainer>
  )
}

export default EditCommentModal;