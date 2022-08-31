import React from 'react'
import axios from 'axios'
const SignUp = () => {
    const signUptesting = () => {
      axios.post('http://localhost:5000/')
    }
  return (
    <div>SignUp</div>
  )
}

export default SignUp