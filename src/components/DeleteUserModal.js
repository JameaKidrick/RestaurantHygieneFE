import React from 'react'
import { useDispatch } from 'react-redux'

// ACTIONS
import { deleteUser } from '../actions'

const DeleteUserModal = ({ user_id, setDeleting, persistor, history }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteUser(user_id, setDeleting, persistor, history))
  }

  return(
    <div className='delete_modal'>
      <form onSubmit={handleSubmit}>
        Are you sure you want to delete your account?
        <button type='submit'>Yes</button>
        <button onClick={()=>setDeleting(false)}>No</button>
      </form>
    </div>
  )
}

export default DeleteUserModal;