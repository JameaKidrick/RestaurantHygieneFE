import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// ACTIONS


// STYLING
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
  const restaurant = props.location.state.restaurant

  console.log('restaurant', restaurant)
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
        name="customized-color"
        defaultValue={restaurant.avgHygieneRating}
        precision={0.1}
        className={classes[customIcons[Math.ceil(restaurant.avgHygieneRating)]]}
        readOnly
      />
      
      {
        localStorage.getItem('token') ? (
          <div>You can see</div>
        ):
        <div>Please <Link to={{ pathname: '/login', state: {last:props.location.pathname, next:props.location.state.last}}}>sign in</Link> to see user ratings and reviews</div>
      }
    </div>
  );
};

export default SingleRestaurant;