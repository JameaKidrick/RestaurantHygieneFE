import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// ACTIONS
import { getReviewsByRestaurantID, getRestaurantByPlaceID } from '../actions'

// STYLING
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteCommentModal from "./DeleteCommentModal";

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
  const classes = useStyles();
  const dispatch = useDispatch()
  const restaurantInfo = useSelector(state => state.reviewsReducer)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const user_id2 = localStorage.getItem('user_id')
  const restaurant = props.location.state.restaurant
  const [hover, setHover] = useState(0)
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: ''
  })
  const [editing, setEditing] = useState(false)
  const [editHover, setEditHover] = useState(0)
  const [editReview, setEditReview] = useState({
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

  const handleChanges = (e) => {
    if(e.target.name === 'rating'){
      setNewReview({...newReview, [e.target.name]:Number(e.target.value)})
    }else{
      setNewReview({...newReview, [e.target.name]:e.target.value})
    }
    
  }

  const handleEditingStatus = (originalReview) => {
    setEditing(!editing)
    setEditReview({
      rating: originalReview.rating,
      review: originalReview.review
    })
  }

  const handleEditChanges = (e) => {
    if(e.target.name === 'edit_rating'){
      setEditReview({...editReview, rating:Number(e.target.value)})
    }else{
      setEditReview({...editReview, review:e.target.value})
    }
  }

  const handleEditHoverChanges = (e, newHover) => {
    setEditHover(newHover)
  }

  const handleHoverChanges = (e, newHover) => {
    setHover(newHover)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newReview)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log(editReview)
  }

  useEffect(() => {
    dispatch(getRestaurantByPlaceID(restaurant.place_id))
  }, [])

  useEffect(() => {
    if(restaurantInfo.restaurant_id !== 0){
      dispatch(getReviewsByRestaurantID(restaurantInfo.restaurant_id))
    }
  }, [restaurantInfo.restaurant_id])

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
        localStorage.getItem('token') ? (
          <div className='review'>
            <form style={{border:'2px solid blue'}} onSubmit={handleSubmit}>
              <div style={{display:'flex'}}>
                <Rating
                  name="rating"
                  precision={0.5}
                  value={newReview.rating}
                  onChange={handleChanges}
                  onChangeActive={handleHoverChanges}
                />
                <Typography component="legend">
                  {<span style={{ fontWeight: "bold" }}>{hover !== -1 ? hover : newReview.rating ? newReview.rating: 0}</span>}
                </Typography>
              </div>
              <input
                type='text'
                name='review'
                onChange={handleChanges}
              />
              <button>Add Review</button>
            </form>
            
            {restaurantInfo.reviews.map((review, index) => {
              return(
                review.user_id === Number(user_id2) ? 
                  <div key={index}>
                  <br/>
                    <EditIcon onClick={()=>handleEditingStatus(review)}/>
                    <DeleteForeverIcon onClick={()=>setDeleting(!deleting)}/>
                    <div>{review.username}</div>
                    <div>{formatDate(review.created_at)}</div>
                    <Rating
                      name="restaurant_rating"
                      defaultValue={review.rating}
                      precision={0.1}
                      readOnly
                    />
                    <div>{review.review}</div>

                    {editing && (
                    <form style={{border:'2px solid blue'}} onSubmit={handleEditSubmit}>
                      <h4>Edit your review</h4>
                      <div style={{display:'flex'}}>
                        <Rating
                          name="edit_rating"
                          precision={0.5}
                          value={editReview.rating}
                          onChange={handleEditChanges}
                          onChangeActive={handleEditHoverChanges}
                        />
                        <Typography component="legend">
                          {<span style={{ fontWeight: "bold" }}>{editHover > 0 ? editHover : editReview.rating}</span>}
                        </Typography>
                      </div>
                      <input
                        type='text'
                        name='review'
                        onChange={handleEditChanges}
                        defaultValue={editReview.review}
                      />
                      <button>Edit Review</button>
                    </form>
                  )}
                  {deleting && (
                    <DeleteCommentModal setDeleting={setDeleting} />
                  )}
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
          </div>
        ):
        <div>Please <Link to={{ pathname: '/login', state: {last:props.location.pathname, next:props.location.state.last}}}>sign in</Link> to see user ratings and reviews</div>
      }
    </div>
  );
};

/*
created_at: "2020-07-11T23:50:38.163Z"
first_name: "user"
id: 2
last_name: "two"
password: "$2b$10$OryQPhSWOnggnXuMXHYbTOc26bVc1gynbH4u66J3dKWhNyDjDeGSG"
rating: 4
restaurant_id: 2
review: "I think they wash their hands and stuff"
updated_at: "2020-07-11T23:50:38.163Z"
user_id: 2
username: "user2"
*/

export default SingleRestaurant;