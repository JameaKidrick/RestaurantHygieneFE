import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import DeleteFavoriteModal from './DeleteFavoriteModal';

// ACTIONS
import { getAllFavoritesByUserID } from '../actions';

// STYLES
import { ParentContainer } from '../styles/cardsStyling';

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
    <ParentContainer section='fave'>
      <p id='header'>My Favorite Restaurants</p>
      {user_favorites.map((favorite, index) => {
        return(
          <div className='card' key={index}>
            <Link className='link singleRestaurant' to={`/restaurant/${favorite.place_id}`}>
              <div className='restaurantName'>{favorite.restaurant_name}</div>
              <div className='restaurantAddress'>{favorite.restaurant_address}</div>
            </Link>
            <div className='buttonContainer'><button id='deleteButton' onClick={()=>handleFavoriteChanges(favorite)}>Delete</button></div>
          </div>
        )
      })}
      {deleting && (
        <DeleteFavoriteModal favorite={currentFavorite} setDeleting={setDeleting} user_id={user_id} />
      )}
    </ParentContainer>
  )
}

export default MyFavoriteRestaurants;