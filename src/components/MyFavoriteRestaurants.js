import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            <div>{favorite.restaurant_name}</div>
            <div>{favorite.restaurant_address}</div>
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