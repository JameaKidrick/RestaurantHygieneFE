import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

// ACTIONS
import { placeDetails } from "../actions";

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
  const dispatch = useDispatch()
  const place = useSelector(state => state.googleAPIReducer.single_restaurant)
  console.log(props.location);

  useEffect(() => {
    // dispatch(singleRestaurant(props.location.state))
  }, [])

  console.log('PLACE', place)
  return (
    <div>
      SINGLE RESTAURANT PAGE
      <Link to={{pathname: props.location.state.last, state: {restaurant:props.restaurant, last:props.location.pathname}}}>Return to results</Link>
      {/* <h2>
        {restaurant.name}
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
        <div>Please <Link to={{ pathname: '/login', state: restaurant}}>sign in</Link> to see user ratings and reviews</div>
      } */}
    </div>
  );
};

export default SingleRestaurant;

/*
address_components: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
adr_address: "<span class="locality">Martinsburg</span>, <span class="region">WV</span> <span class="postal-code">25401</span>, <span class="country-name">USA</span>"
business_status: "OPERATIONAL"
formatted_address: "Martinsburg, WV 25401, USA"
geometry: {location: {…}, viewport: {…}}
icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
name: "McDonald’s"
place_id: "ChIJjWYOtykDyokR-kS0ikxSI84"
plus_code: {compound_code: "F228+53 Martinsburg, WV, United States", global_code: "87F4F228+53"}
types: (4) ["restaurant", "food", "point_of_interest", "establishment"]
url: "https://maps.google.com/?cid=14853806484696089850"
utc_offset: -240
vicinity: "Martinsburg"


avgHygieneRating: null ❌
business_status: "OPERATIONAL" ✅
formatted_address: "Martinsburg, WV 25401" ✅
geometry: {location: {…}, viewport: {…}} ✅
icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png" ✅
id: "64e1edf398001fbfce347df56b3742d634ae9173" ✅
name: "McDonald’s" ✅
place_id: "ChIJjWYOtykDyokR-kS0ikxSI84" ✅
plus_code: {compound_code: "F228+53 Martinsburg, West Virginia", global_code: "87F4F228+53"} ✅
price_level: 1 ❌
rating: 5 ❌
reference: "ChIJjWYOtykDyokR-kS0ikxSI84" ❌
types: (4) ["restaurant", "food", "point_of_interest", "establishment"] ✅
user_ratings_total: 1 ❌
*/
