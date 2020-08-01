import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// ACTIONS
import { addReview } from '../actions'

// STYLING
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

const AddCommentModal = ({ restaurant, restaurantInfo, setCreating }) => {
  const dispatch = useDispatch()
  const [hover, setHover] = useState(0)
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: ''
  })

  const handleChanges = (e) => {
    if(e.target.name === 'rating'){
      setNewReview({...newReview, [e.target.name]:Number(e.target.value)})
    }else{
      setNewReview({...newReview, [e.target.name]:e.target.value})
    }
  }

  const handleHoverChanges = (e, newHover) => {
    setHover(newHover)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addReview(restaurant.place_id, newReview, restaurantInfo.restaurant_id, setNewReview))
  }

  return(
    <div className='delete_modal'>
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
            {<span style={{ fontWeight: "bold" }}>{hover > 0 ? hover : newReview.rating ? newReview.rating === 0 ? false : newReview.rating: false}</span>}
          </Typography>
        </div>
        <input
          type='text'
          name='review'
          onChange={handleChanges}
        />
        <button>Add Review</button>
        <button onClick={()=>setCreating(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default AddCommentModal;