import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import DeleteFavoriteModal from './DeleteFavoriteModal';

// ACTIONS
import { getAllFavoritesByUserID } from '../actions';

const MyFavoriteRestaurants = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const user_favorites = useSelector(state => state.logInReducer.user_favorites)
  const [deleting, setDeleting] = useState(false)
  const [currentFavorite, setCurrentFavorite] = useState({})

  useEffect(() => {
    dispatch(getAllFavoritesByUserID(user_id))
  }, [])

  const handleFavoriteChanges = (favorite) => {
    setCurrentFavorite(favorite)
    setDeleting(true)
  }

  if(isFetching){
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <h2>My Favorite Restaurants</h2>
      {user_favorites.map((favorite, index) => {
        return(
          <div key={index}>
            <Link className='link singleRestaurant' to={`/restaurant/${favorite.place_id}`}>
              <div>{favorite.restaurant_name}</div>
              <div>{favorite.restaurant_address}</div>
            </Link>
            <button onClick={()=>handleFavoriteChanges(favorite)}>Delete</button>
          </div>
        )
      })}
      {deleting && (
        <DeleteFavoriteModal favorite={currentFavorite} setDeleting={setDeleting} user_id={user_id} />
      )}
    </div>
  )
}

export default MyFavoriteRestaurants;

/*
created_at: "2020-08-02T17:14:24.514Z"
id: 32
place_id: "ChIJVZ6MsNkDyokRs884W2r6gE8"
restaurant_address: "14634 Apple Harvest Dr, Martinsburg, WV 25401, USA"
restaurant_id: 2
restaurant_name: "McDonald's"
updated_at: "2020-08-02T17:14:24.514Z"
user_id: 6
*/