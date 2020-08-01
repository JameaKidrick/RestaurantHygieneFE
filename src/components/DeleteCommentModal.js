import React from 'react'

const DeleteCommentModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('YES PLEASE DELETE MY COMMENT')
  }
  return(
    <div className='delete_modal'>
      <form onSubmit={handleSubmit}>
        Are you sure you want to delete this comment?
        <button type='submit'>Yes</button>
        <button onClick={()=>props.setDeleting(false)}>No</button>
      </form>
    </div>
  )
}

export default DeleteCommentModal;