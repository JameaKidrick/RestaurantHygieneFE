import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ACTIONS
import { deleteFavorite } from '../actions'

const DeleteFavoriteModal = ({ favorite, setDeleting, user_id }) => {
  const dispatch = useDispatch()
  const user_favorites = useSelector(state => state.logInReducer.user_favorites)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!favorite.restaurant_name){
      favorite = user_favorites.find(restaurant => {
        return restaurant.place_id === favorite.place_id
      })
    }
      dispatch(deleteFavorite(favorite.id, setDeleting, user_id))
  }

  return(
    <div className='delete_modal'>
      <form onSubmit={handleSubmit}>
        Are you sure you want to delete {favorite.restaurant_name ? favorite.restaurant_name : favorite.name} from your favorites list?
        <button type='submit'>Yes</button>
        <button onClick={()=>setDeleting(false)}>No</button>
      </form>
    </div>
  )
}

export default DeleteFavoriteModal;