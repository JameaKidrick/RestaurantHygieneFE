import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";
import AddCommentModal from "./AddCommentModal";

// ACTIONS
import { getReviewsByRestaurantID, getRestaurantByPlaceID } from '../actions'

// STYLING
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
  worst: {
    color: "#ff0000",
  },
  bad: {
    color: "#E9692C",
  },
  good: {
    color: "#FFD700",
  },
  great: {
    color: "#32CD32",
  },
}));

const customIcons = {
  0: "worst",
  1: "worst",
  2: "bad",
  4: "good",
  5: "great",
};

const SingleRestaurant = (props) => {
  /****************************************** STATE ******************************************/
  const classes = useStyles();
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const restaurantInfo = useSelector(state => state.reviewsReducer)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const restaurant = props.location.state.restaurant

  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(false)
  const [originalReview, setOriginalReview] = useState({
    rating: 0,
    review: ''
  })
  const [deleting, setDeleting] = useState(false)

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

  console.log(creating)

  /************************************** LIFECYCLE **************************************/
  useEffect(() => {
    dispatch(getRestaurantByPlaceID(restaurant.place_id))
  }, [])

  useEffect(() => {
    if(restaurantInfo.restaurant_id !== undefined){
      dispatch(getReviewsByRestaurantID(restaurantInfo.restaurant_id))
    }
  }, [restaurantInfo.restaurant_id])

  if(isFetching === true){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div>
      SINGLE RESTAURANT PAGE
      <Link to={{pathname: `/findrestaurant?page=${props.location.state.page}`, state: {page:props.location.state.page, parameters:props.location.state.parameters, last:props.location.pathname}}}>Return to results</Link>
      <h2>{restaurant.name}
        <span style={{fontSize: '0.8rem'}}>{restaurant.opening_hours ?
          restaurant.opening_hours['open_now'] === true ? 
          <h4 style={{color: 'green'}}>Open</h4>: <h4 style={{color: 'red'}}>Closed</h4>: false
          }
        </span>
      </h2>
      <p>{restaurant.formatted_address}</p>
      <Typography component="legend">
        Hygiene Rating:{' '}
        {restaurant.avgHygieneRating === null ? (
          <span style={{ fontWeight: "bold" }}>Not Rated</span>
        ) : (
          <span style={{ fontWeight: "bold" }}>
            {restaurant.avgHygieneRating}
          </span>
        )}
      </Typography>

      <Rating
        name="average_rating"
        defaultValue={restaurant.avgHygieneRating}
        precision={0.1}
        className={classes[customIcons[Math.ceil(restaurant.avgHygieneRating)]]}
        readOnly
      />
      {
        localStorage.getItem('token') ? 
          restaurantInfo.reviews.message === 'There are no reviews for this restaurant.' ? <div>
            Be the first to add a review!
            <AddIcon onClick={()=>setCreating(true)} />
            {creating && (
              <AddCommentModal restaurant={restaurant} restaurantInfo={restaurantInfo} setCreating={setCreating} />
            )}
          </div>:<div className='review'>
          <AddIcon onClick={()=>setCreating(true)} />
          {restaurantInfo.reviews.map((review, index) => {
            return(
              review.user_id === Number(user_id) ? 
                <div key={index}>
                <br/>
                  <EditIcon onClick={()=>handleEditingStatus(review)}/>
                  <DeleteForeverIcon onClick={()=>handleDeletingStatus(review)}/>
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
                :
                <div key={index}>
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
            )
          })}
          {creating && (
            <AddCommentModal restaurant={restaurant} restaurantInfo={restaurantInfo} setCreating={setCreating} />
          )}
          {editing && (
            <EditCommentModal originalReview={originalReview} setEditing={setEditing} />
          )}
          {deleting && (
            <DeleteCommentModal review={originalReview} formatDate={formatDate} setDeleting={setDeleting} />
          )}
        </div>
        :
        <div>Please <Link to={{ pathname: '/login', state: {last:props.location.pathname, next:props.location.state.last}}}>sign in</Link> to see user ratings and reviews</div>
      }
    </div>
  );
};

export default SingleRestaurant;