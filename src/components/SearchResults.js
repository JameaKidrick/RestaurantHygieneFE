import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import DeleteFavoriteModal from "./DeleteFavoriteModal";

// ACTIONS
import { placeLocator_nextPage, addNewFavorite } from "../actions";

// STYLING
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Results } from "../syles/resultsStyling";

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

const SearchResults = ({
  pageNumber,
  setPageNumber,
  parameters,
  setParameters,
  setUserLocation,
  query,
  history,
  location,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.appStatusReducer.isFetching);
  const places = useSelector((state) => state.googleAPIReducer.places);
  const pages = useSelector((state) => state.googleAPIReducer.pages);
  const next_page = useSelector((state) => state.googleAPIReducer.next_page);
  const status = useSelector((state) => state.googleAPIReducer.status);
  const user_id = useSelector((state) => state.logInReducer.user_id);
  const user_favorites = useSelector(
    (state) => state.logInReducer.user_favorites
  );
  const favorites_place_ids = user_favorites.map((favorite) => {
    return favorite.place_id;
  });
  const [deleting, setDeleting] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState({});

  const handleDeleteFavoriteChanges = (e, favorite) => {
    e.preventDefault();
    setCurrentFavorite(favorite);
    setDeleting(true);
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

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
    if (!pages[pageNumber]) {
      dispatch(
        placeLocator_nextPage(next_page, history, `?page=${pageNumber + 1}`)
      );
    }
  };

  const handleBackPage = () => {
    setPageNumber(pageNumber - 1);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Results>
      <div className='pageDirections'>
        {pages.length > 1 && pageNumber !== 1 && (
          <Link
            className="link search back"
            to={`/findrestaurant?page=${pageNumber - 1}`}
            onClick={() => handleBackPage()}
          >{`<--- Back`}</Link>
        )}
        {(pageNumber !== pages.length || next_page) && (
          <Link
            className="link search back"
            to={`/findrestaurant?page=${pageNumber - 1}`}
            onClick={() => handleBackPage()}
          >{`<--- Back`}</Link>
        )}
        {(pageNumber !== pages.length || next_page) && (
          <Link
            className="link search next"
            to={`/findrestaurant?page=${pageNumber + 1}`}
            onClick={() => handleNextPage()}
          >{`Next --->`}</Link>
        )}
      </div>
      {status === "ZERO_RESULTS" ? (
        <div id="noResultsError">
          No restaurants found within the desired radius.
        </div>
      ) : places.length > 0 ? (
        location.state &&
        (location.state !== undefined || location.state !== null) ? (
          <div className='cards'>
            {pages[location.state.page - 1].map((restaurant, restaurantIndex) => {
              return (
                <Link
                  to={{
                    pathname: `/restaurant/${restaurant.place_id}`,
                    state: {
                      restaurant,
                      pageNumber,
                      last: location.pathname + query,
                      page: pageNumber,
                      parameters: parameters,
                    },
                  }}
                  className="link singleRestaurant restaurant"
                  key={restaurantIndex}
                >
                  <p className='restaurantName'>{restaurant.name}</p>
                  {localStorage.getItem("token") &&
                    (favorites_place_ids.includes(restaurant.place_id) ? (
                      <FavoriteIcon
                        onClick={(e) =>
                          handleDeleteFavoriteChanges(e, restaurant)
                        }
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={(e) => handleAddFavoriteChanges(e, restaurant)}
                      />
                    ))}
                  <div className={classes.root}>
                    <Typography component="legend">Hygiene Rating</Typography>
                    <Rating
                      name="restaurant_rating"
                      defaultValue={restaurant.avgHygieneRating}
                      precision={0.1}
                      className={
                        classes[
                          customIcons[Math.ceil(restaurant.avgHygieneRating)]
                        ]
                      }
                      readOnly
                    />
                    {restaurant.avgHygieneRating === null ? (
                      <div>Not Rated</div>
                    ) : (
                      <div>{restaurant.avgHygieneRating}</div>
                    )}
                  </div>
                  <p>Address: {restaurant.formatted_address}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className='cards'>
            {pages[0].map((restaurant, restaurantIndex) => {
              return (
                <Link
                  to={{
                    pathname: `/restaurant/${restaurant.place_id}`,
                    state: {
                      restaurant,
                      pageNumber,
                      last: location.pathname + query,
                      page: pageNumber,
                      parameters: parameters,
                    },
                  }}
                  className="link singleRestaurant restaurant"
                  key={restaurantIndex}
                >
                  <div id='favorite'>
                    {localStorage.getItem("token") &&
                      (favorites_place_ids.includes(restaurant.place_id) ? (
                        <FavoriteIcon
                          onClick={(e) =>
                            handleDeleteFavoriteChanges(e, restaurant)
                          }
                          className='heartIcon favorited'
                        />
                      ) : (
                        <FavoriteBorderIcon
                          onClick={(e) => handleAddFavoriteChanges(e, restaurant)}
                          className='heartIcon'
                        />
                      ))}
                    <p className='restaurantName'>{restaurant.name}</p>
                  </div>
                  <p id='address'>{restaurant.formatted_address}</p>
                  <div className='rating'>
                    <p className='subtitle'>Hygiene Rating</p>
                    <div>
                      <Rating
                        name="customized-color"
                        defaultValue={restaurant.avgHygieneRating}
                        precision={0.1}
                        className={
                          classes[
                            customIcons[Math.ceil(restaurant.avgHygieneRating)]
                          ]
                        }
                        id='stars'
                        readOnly
                      />
                      {restaurant.avgHygieneRating === null ? (
                        <p className='avg'>Not Rated</p>
                      ) : (
                        <p className='avg'>{restaurant.avgHygieneRating}</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      ) : (
        false
      )}
      {deleting && (
        <DeleteFavoriteModal
          favorite={currentFavorite}
          setDeleting={setDeleting}
          user_id={user_id}
        />
      )}
      <div className='pageDirections'>
        {pages.length > 1 && pageNumber !== 1 && (
          <Link
            className="link search back"
            to={`/findrestaurant?page=${pageNumber - 1}`}
            onClick={() => handleBackPage()}
          >{`<--- Back`}</Link>
        )}
        {(pageNumber !== pages.length || next_page) && (
          <Link
            className="link search back"
            to={`/findrestaurant?page=${pageNumber - 1}`}
            onClick={() => handleBackPage()}
          >{`<--- Back`}</Link>
        )}
        {(pageNumber !== pages.length || next_page) && (
          <Link
            className="link search next"
            to={`/findrestaurant?page=${pageNumber + 1}`}
            onClick={() => handleNextPage()}
          >{`Next --->`}</Link>
        )}
      </div>
    </Results>
  );
};

export default SearchResults;
