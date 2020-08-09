import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviews from './MyReviews';


const MyProfile = () => {
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const [reviewsStatus, setReviewsStatus] = useState(false)

  /************************************** HANDLERS **************************************/

  if(isFetching === true){
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <h2 onClick={()=>setReviewsStatus(true)}>My Reviews</h2>
    </div>
  )
}

export default MyProfile;