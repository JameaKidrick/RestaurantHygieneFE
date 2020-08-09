import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteReviewModal from "./DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";

// ACTIONS
import { getReviewsByUserID } from '../actions';

// STYLES
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const MyReviews = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const user_reviews = useSelector(state => state.logInReducer.user_reviews)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [originalReview, setOriginalReview] = useState({
    rating: 0,
    review: ''
  })

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const publishDate = new Date(date)
    return `${days[publishDate.getDay()]}, ${monthNames[publishDate.getMonth()]} ${publishDate.getDate()}, ${publishDate.getFullYear()}`
  }

  /************************************** HANDLERS **************************************/

  const handleEditingStatus = (review) => {
    if(editing === false){
      setEditing(true)
    }
    setOriginalReview(review)
  }

  const handleDeletingStatus = (review) => {
    if(deleting === false){
      setDeleting(true)
    }
    setOriginalReview(review)
  }

  useEffect(() => {
    dispatch(getReviewsByUserID(user_id))
  }, [])

  

  if(isFetching === true){
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <h2>My Reviews</h2>
      {user_reviews.map((review, index) => {
        return(
          <div key={index}>
            <br/>
            <div>{review.restaurant_name}</div>
            <div>{review.restaurant_address}</div>
            <div>{formatDate(review.created_at)}</div>
            <div style={{display:'flex'}}>
              <Rating
                name="edit_rating"
                precision={0.5}
                value={review.rating}
                readOnly
              />
              <Typography component="legend">
                {<span style={{ fontWeight: "bold" }}>{review.rating}</span>}
              </Typography>
            </div>
            <div>{review.review}</div>
            <EditIcon onClick={()=>handleEditingStatus(review)}/>
            <DeleteForeverIcon onClick={()=>handleDeletingStatus(review)}/>
          </div>
        )
      })}
      {editing && (
        <EditReviewModal originalReview={originalReview} setEditing={setEditing} user_id={user_id} />
      )}
      {deleting && (
        <DeleteReviewModal review={originalReview} formatDate={formatDate} setDeleting={setDeleting} user_id={user_id} />
      )}
    </div>
  )
}

export default MyReviews;