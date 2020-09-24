import React from 'react'
import { useDispatch } from 'react-redux'

// ACTIONS
import { deleteUser } from '../actions'

// STYLES
import { ModalContainer } from '../syles/modalStyling'

const DeleteUserModal = ({ user_id, setDeleting, persistor, history }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteUser(user_id, setDeleting, persistor, history))
  }

  return(
    <ModalContainer className='overlay' onClick={()=>setDeleting(false)}>
      <form id='modalForm' onSubmit={handleSubmit}>
        <p>Are you sure you want to delete your account?</p>
        <button type='submit'>Yes</button>
        <button onClick={()=>setDeleting(false)}>No</button>
      </form>
    </ModalContainer>
  )
}

export default DeleteUserModal;