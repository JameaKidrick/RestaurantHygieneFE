import React, { useState } from 'react';
import axios from 'axios';


const Upload = () => {
  const [pic, setPic] = useState('')

  const handleChanges = e => {
    setPic(e.target.value)
  }

  console.log(pic)
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5555/api/upload', e.target.value)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return(
    <div>
      Welcome to the Upload Page!
      <form onSubmit={handleSubmit}>
        <input type='file' id='myFile' name='filename' onChange={handleChanges}/>
        <input type='submit' />
      </form>
    </div>
  )
};

export default Upload;