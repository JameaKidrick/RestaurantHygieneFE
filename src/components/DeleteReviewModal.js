import React from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import { deleteReview } from "../actions";

// STYLING
import Rating from "@material-ui/lab/Rating";
import { ModalContainer } from "../syles/modalStyling";
import { Button, DeleteButton } from "../syles/formStyling";

const DeleteCommentModal = ({ review, formatDate, setDeleting, user_id }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      deleteReview(review.id, review.restaurant_id, setDeleting, user_id)
    );
  };

  return (
    <ModalContainer className="overlay">
      <form id="modalForm" onSubmit={handleSubmit}>
        <p>Are you sure you want to delete this review?</p>
        <div id="reviewInfo">
          <br />
          <div>{review.username}</div>
          <div>{formatDate(review.created_at)}</div>
          <Rating
            name="restaurant_rating"
            className="rating"
            defaultValue={review.rating}
            precision={0.1}
            readOnly
          />
          <div>{review.review}</div>
        </div>
        <div className="buttonContainer">
          <DeleteButton type="submit">Yes</DeleteButton>
          <Button onClick={() => setDeleting(false)}>No</Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default DeleteCommentModal;
