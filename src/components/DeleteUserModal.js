import React from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import { deleteUser } from "../actions";

// STYLES
import { ModalContainer } from "../styles/modalStyling";
import { Button, DeleteButton } from "../styles/formStyling";

const DeleteUserModal = ({ user_id, setDeleting, persistor, history }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user_id, setDeleting, persistor, history));
  };

  return (
    <ModalContainer className="overlay">
      <form id="modalForm" onSubmit={handleSubmit}>
        <p>Are you sure you want to delete your account?</p>
        <div className="buttonContainer">
          <DeleteButton type="submit">Yes</DeleteButton>
          <Button onClick={() => setDeleting(false)}>No</Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default DeleteUserModal;
