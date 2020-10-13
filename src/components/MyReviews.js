import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import DeleteReviewModal from "./DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";

// ACTIONS
import { getReviewsByUserID } from '../actions';

// STYLES
import Rating from "@material-ui/lab/Rating";
import { ParentContainer } from '../styles/cardsStyling';

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
    <ParentContainer>
      <p id='header'>My Reviews</p>
      <div>
        {user_reviews.map((review, index) => {
          return(
            <div className='card' key={index}>
              <br/>
              <Link className='link singleRestaurant' to={`/restaurant/${review.place_id}`}>
                <div className='restaurantName'>{review.restaurant_name}</div>
                <div className='restaurantAddress'>{review.restaurant_address}</div>
                <div className='reviewDate'>{formatDate(review.created_at)}</div>
              </Link>
              <div className='ratingContainer'>
                <Rating
                  name="edit_rating"
                  id='ratingStars'
                  precision={0.5}
                  value={review.rating}
                  readOnly
                />
                <p className='ratingScore'>
                  {<span>{review.rating}</span>}
                </p>
              </div>
              <div className='review'>{review.review}</div>
              <div className='buttonContainer'>
                <button id='editButton' onClick={()=>handleEditingStatus(review)}>Edit</button>
                <button id='deleteButton' onClick={()=>handleDeletingStatus(review)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      {editing && (
        <EditReviewModal originalReview={originalReview} setEditing={setEditing} user_id={user_id} />
      )}
      {deleting && (
        <DeleteReviewModal review={originalReview} formatDate={formatDate} setDeleting={setDeleting} user_id={user_id} />
      )}
    </ParentContainer>
  )
}

export default MyReviews;