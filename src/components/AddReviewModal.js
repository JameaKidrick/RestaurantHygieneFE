import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

// ACTIONS
import { addReview } from "../actions";

// STYLING
import Rating from "@material-ui/lab/Rating";
import { ModalContainer } from '../syles/modalStyling'
import { Button, DeleteButton, Input } from '../syles/formStyling'

const AddCommentModal = ({ restaurant, restaurantInfo, setCreating }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formErrors, setFormErrors] = useState({
    rating: '',
    review: ''
  })
  const [newReview, setNewReview] = useState({
    restaurant_name: restaurant.name,
    restaurant_address: restaurant.formatted_address,
    rating: 0,
    review: "",
  });

  const addReviewFormSchema = Yup.object().shape({
    rating: Yup.number().min(0.5, 'Please add a rating that is above 0'),
    review: Yup.string().min(4, 'Reviews must be at least 4 characters long').required('Please add a review')
  })

  useEffect(() => {
    addReviewFormSchema.isValid(newReview).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [newReview]);

  console.log('Errors', formErrors)

  const handleChanges = (e) => {
    e.persist();
    Yup
      .reach(addReviewFormSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setFormErrors({ ...formErrors, [e.target.name]:'' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
    if (e.target.name === "rating") {
      setNewReview({ ...newReview, [e.target.name]: Number(e.target.value) });
    } else {
      setNewReview({ ...newReview, [e.target.name]: e.target.value });
    }
  };

  const handleHoverChanges = (e, newHover) => {
    setHover(newHover);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addReview(
        restaurant.place_id,
        newReview,
        restaurantInfo.restaurant_id,
        setNewReview,
        setCreating
      )
    );
  };

  return (
    <ModalContainer className="overlay">
      <form id='modalForm' onSubmit={handleSubmit}>
        <p>Add a review</p>
        <div className='reviewContainer'>
          <Rating
            name="rating"
            id='ratingStars'
            precision={0.5}
            value={newReview.rating}
            onChange={handleChanges}
            onChangeActive={handleHoverChanges}
          />
          <p className='ratingScore'>
            {
              <p>
                {hover > 0
                  ? hover
                  : newReview.rating
                  ? newReview.rating === 0
                    ? false
                    : newReview.rating
                  : 0}
              </p>
            }
          </p>
        </div>
        <Input type="text" name="review" placeholder='Review' onChange={handleChanges} />
        {formErrors.review && (<p className="error">{formErrors.review}</p>)}
        <div type='submit' className='buttonContainer'>
          <DeleteButton disabled={buttonDisabled}>Add Review</DeleteButton>
          <Button onClick={() => setCreating(false)}>Cancel</Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default AddCommentModal;
