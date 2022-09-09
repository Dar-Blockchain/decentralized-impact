import axios from 'axios'
import React from 'react'
import './login.css'
import { useState } from 'react'
import validator from 'validator';
import { Link } from 'react-router-dom';

const Login = () => {

  const [inputState, setInput] = useState({input: {email: '', password: ''}})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  function setEmail(event){
    setInput({...inputState, input:{password: inputState.input.password, email: event.target.value}})
  }


//   {
//     "message": "Project found",
//     "value": [
//         {
//             "_id": "63186d8332c934a809eaa506",
//             "title": "Friends",
//             "category": "finance",
//             "teamMemberEmails": [
//                 "adam@gmail.com",
//                 "youssef@gmail.com"
//             ],
//             "description": "hi world",
//             "state": "incubation",
//             "descriptionFileUrl": "An Url",
//             "isConfirmed": false,
//             "__v": 0
//         }
//     ]
// }

  function setPassword(event){
  setInput({...inputState, input:{email: inputState.input.email ,password: event.target.value}})
  }


  const testLogin = () => {
    if (!(validator.isEmail(inputState.input.email))){
      setError("Email is not valid")
      return
  }
  else {
    
    axios.post('https://decentralized-impact.alwaysdata.net/api/signin', {
      email: inputState.input.email,
      password: inputState.input.password,
    }).then((res) => {
      localStorage.setItem('UserData', res.data.user)
      localStorage.setItem('loginStatus', 'logged')
      // Admin Project confirmation, user can access confirmed projects 
      window.location.reload()
    }).catch((err) => {
      console.error(err)
    })
  }
  }




  return (
    <div className='LoginContainer'>
      <div className='LoginInputContainer'>
      <img src='/Assets/Logo.svg' srcSet='/Assets/Logo.svg' id='logo'/>

        <div className='QuickLogin'>
          <button className='QuickBtn'><img srcSet='/Assets/Google__G__Logo.svg' />Sign In With Google</button>
          <button className='QuickBtn'><img srcSet='/Assets/Facebook_f_logo_(2021).svg' />Sign In With Facebook</button>
        </div>
        <div className='InputSection'>
          <span className='Line'>
          <h6>Or Sign In Email</h6>
          </span>
          <div className='inputFiledLabel'>
          <label htmlFor="emailInput">Email address</label>
          <input onChange={setEmail} type={'email'} id="emailInput" name='emailInput' placeholder='Insert your email' />
          </div>
          <div>
          <div className='passwordLabel'>
            <label htmlFor="passwordInput">Password</label>
            <p>Forgot Password?</p>
          </div>
            <input onChange={setPassword} type={'password'} name="passwordInput" id="passwordInput" />
          </div>
            <button className='LoginBtn' onClick={testLogin}>Login</button>
          </div>
          <p>Already have an account? <Link to={"/signup"}>Sign Up</Link></p>
      </div>

      <div className='MediaSection'>
        <img srcSet='/Assets/Rectangle.svg' alt='' id='MediaSecBg'/>
      </div>
    </div>
  )
}

export default Login