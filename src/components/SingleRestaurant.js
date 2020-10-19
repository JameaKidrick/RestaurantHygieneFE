import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteReviewModal from "./DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";
import AddReviewModal from "./AddReviewModal";
import DeleteFavoriteModal from "./DeleteFavoriteModal";
import Loading from './Loading';

// ACTIONS
import {
  getRestaurantByPlaceID,
  addNewFavorite,
  placeDetails,
} from "../actions";

// STYLING
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  SingleRestaurantPage,
  Opening_hours,
} from "../styles/singleRestaurantStyling";
import { ParentContainer } from '../styles/cardsStyling';

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
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.appStatusReducer.isFetching);
  const restaurantInfo = useSelector((state) => state.reviewsReducer);
  const user_id = useSelector((state) => state.logInReducer.user_id);
  const user_favorites = useSelector(
    (state) => state.logInReducer.user_favorites
  );
  const favorites_place_ids = user_favorites.map((favorite) => {
    return favorite.place_id;
  });
  const [restaurant, setRestaurant] = useState({});
  const [currentFavorite, setCurrentFavorite] = useState({});
  const [faveDeleting, setFaveDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [originalReview, setOriginalReview] = useState({
    rating: 0,
    review: "",
  });

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const publishDate = new Date(date);
    return `${days[publishDate.getDay()]}, ${
      monthNames[publishDate.getMonth()]
    } ${publishDate.getDate()}, ${publishDate.getFullYear()}`;
  };

  /************************************** HANDLERS **************************************/

  const handleEditingStatus = (review) => {
    if (editing === false) {
      setEditing(true);
    }
    setOriginalReview(review);
  };

  const handleDeletingStatus = (review) => {
    if (deleting === false) {
      setDeleting(true);
    }
    setOriginalReview(review);
  };

  const handleDeleteFavoriteChanges = (e, favorite) => {
    e.preventDefault();
    setCurrentFavorite(favorite);
    setFaveDeleting(true);
  };

  const handleAddFavoriteChanges = (e, favorite) => {
    e.preventDefault();
    dispatch(
      addNewFavorite(
        {
          place_id: favorite.place_id,
          restaurant_name: favorite.name,
          restaurant_address: favorite.formatted_address,
        },
        user_id
      )
    );
  };

  /************************************** LIFECYCLE **************************************/
  useEffect(() => {
    if (!props.location.state) {
      dispatch(placeDetails(props.match.params.place_id, setRestaurant));
    } else {
      setRestaurant(props.location.state.restaurant);
    }
  }, []);

  useEffect(() => {
    dispatch(getRestaurantByPlaceID(restaurant.place_id));
  }, [restaurant]);

  if (isFetching) {
    return <Loading />
  }

  return (
    <SingleRestaurantPage>
      {props.location.state && (
        <Link
          className="link search return"
          to={{
            pathname: `/findrestaurant?page=${props.location.state.page}`,
            state: {
              page: props.location.state.page,
              parameters: props.location.state.parameters,
              last: props.location.pathname,
              userLocation: props.location.state.parameters.userLocation,
            },
          }}
        >
          Return to results
        </Link>
      )}
      <div id="header">
        <p id="restaurant_name">{restaurant.name}</p>
        {localStorage.getItem("token") &&
          (favorites_place_ids.includes(restaurant.place_id) ? (
            <FavoriteIcon
              onClick={(e) => handleDeleteFavoriteChanges(e, restaurant)}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={(e) => handleAddFavoriteChanges(e, restaurant)}
            />
          ))}
      </div>
      <p id="restaurant_address">{restaurant.formatted_address}</p>
      <span>
        {restaurant.opening_hours ? (
          restaurant.opening_hours["open_now"] === true ? (
            <Opening_hours color={"green"}>Open</Opening_hours>
          ) : (
            <Opening_hours color={"red"}>Closed</Opening_hours>
          )
        ) : (
          false
        )}
      </span>
      {localStorage.getItem("token") && faveDeleting && (
        <DeleteFavoriteModal
          favorite={currentFavorite}
          setDeleting={setFaveDeleting}
          user_id={user_id}
        />
      )}
      <p id="avgHygiene">
        Hygiene Rating:{" "}
        {restaurant.avgHygieneRating === null ? (
          <span>Not Rated</span>
        ) : (
          <span>{restaurant.avgHygieneRating}</span>
        )}
      </p>
      <Rating
        name="average_rating"
        defaultValue={restaurant.avgHygieneRating}
        precision={0.1}
        className={classes[customIcons[Math.ceil(restaurant.avgHygieneRating)]]}
        readOnly
      />
      {localStorage.getItem("token") ? (
        restaurantInfo.reviews.message ===
        "There are no reviews for this restaurant." ? (
          <div>
            <div className="reviews_header">
              <p>Reviews</p>
              <AddIcon
                className="add_review"
                onClick={() => setCreating(true)}
              />
            </div>
            <p className="reviews_message">Be the first to add a review!</p>
            {creating && (
              <AddReviewModal
                restaurant={restaurant}
                restaurantInfo={restaurantInfo}
                setCreating={setCreating}
              />
            )}
          </div>
        ) : (
          <div className="review">
            <div className="reviews_header">
              <p>Reviews</p>
              <AddIcon
                className="add_review"
                onClick={() => setCreating(true)}
              />
            </div>
            {restaurantInfo.reviews.map((review, index) => {
              return review.user_id === Number(user_id) ? (
                <ParentContainer section='singleRestaurant' key={index}>
                  <div className='card'>
                    <div className='username'>{review.username}</div>
                    <div className='reviewDate'>{formatDate(review.created_at)}</div>
                    <div className='ratingContainer'>
                      <Rating
                        name="restaurant_rating"
                        defaultValue={review.rating}
                        precision={0.1}
                        readOnly
                      />
                    </div>
                    <div className='review'>{review.review}</div>
                    <div className='buttonContainer'>
                      <button
                        id="editButton"
                        onClick={() => handleEditingStatus(review)}
                      >Edit</button>
                      <button
                        id="deleteButton"
                        onClick={() => handleDeletingStatus(review)}
                      >Delete</button>
                    </div>
                  </div>
                </ParentContainer>
              ) : (
                <ParentContainer section='singleRestaurant' key={index}>
                  <div className='card'>
                    <div className='username'>{review.username}</div>
                    <div className='reviewDate'>{formatDate(review.created_at)}</div>
                    <div className='ratingContainer'>
                      <Rating
                        name="restaurant_rating"
                        defaultValue={review.rating}
                        precision={0.1}
                        readOnly
                      />
                    </div>
                    <div className='review'>{review.review}</div>
                  </div>
                </ParentContainer>
              );
            })}
            {creating && (
              <AddReviewModal
                restaurant={restaurant}
                restaurantInfo={restaurantInfo}
                setCreating={setCreating}
              />
            )}
            {editing && (
              <EditReviewModal
                originalReview={originalReview}
                setEditing={setEditing}
              />
            )}
            {deleting && (
              <DeleteReviewModal
                review={originalReview}
                formatDate={formatDate}
                setDeleting={setDeleting}
              />
            )}
          </div>
        )
      ) : props.location.state !== undefined ? (
        <div>
          <p>Reviews</p>
          Please{" "}
          <Link
            className="link login"
            to={{
              pathname: "/login",
              state: {
                last: props.location.pathname,
                next: props.location.state.last,
              },
            }}
          >
            sign in
          </Link>{" "}
          to see user ratings and reviews
        </div>
      ) : (
        <div>
          <p>Reviews</p>
          Please{" "}
          <Link
            className="link login"
            to={{
              pathname: "/login",
              state: { last: props.location.pathname },
            }}
          >
            sign in
          </Link>{" "}
          to see user ratings and reviews
        </div>
      )}
    </SingleRestaurantPage>
  );
};

export default SingleRestaurant;
