import React from "react";
import { useDispatch, useSelector } from "react-redux";

// ACTIONS
import { deleteFavorite } from "../actions";

// STYLES
import { ModalContainer } from "../styles/modalStyling";
import { Button, DeleteButton } from "../styles/formStyling";

const DeleteFavoriteModal = ({ favorite, setDeleting, user_id }) => {
  const dispatch = useDispatch();
  const user_favorites = useSelector(
    (state) => state.logInReducer.user_favorites
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!favorite.restaurant_name) {
      favorite = user_favorites.find((restaurant) => {
        return restaurant.place_id === favorite.place_id;
      });
    }
    dispatch(deleteFavorite(favorite.id, setDeleting, user_id));
  };

  return (
    <ModalContainer className="overlay">
      <form id="modalForm" onSubmit={handleSubmit}>
        <p>
          Are you sure you want to delete{" "}
          {favorite.restaurant_name ? (
            <span>{favorite.restaurant_name}</span>
          ) : (
            <span>{favorite.name}</span>
          )}{" "}
          from your favorites list?
        </p>
        <div className="buttonContainer">
          <DeleteButton type="submit">Yes</DeleteButton>
          <Button onClick={() => setDeleting(false)}>No</Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default DeleteFavoriteModal;
