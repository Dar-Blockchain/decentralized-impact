import axios from 'axios'
import React, { useEffect } from 'react'
import './login.css'
import { useState } from 'react'
import validator from 'validator';
import { Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {googleClientId} from '../config//googleClientId'
import { gapi } from 'gapi-script';

const Login = () => {
  const [inputState, setInput] = useState({input: {email: '', password: ''}})
  const [error, setError] = useState("")

  function setEmail(event){
    setInput({...inputState, input:{password: inputState.input.password, email: event.target.value}})
  }


  function setPassword(event){
  setInput({...inputState, input:{email: inputState.input.email ,password: event.target.value}})
  }


  const testLogin = () => {
    if (!(validator.isEmail(inputState.input.email))){
      setError("Email is not valid")
      return
  }
  else {
    
    axios.post('http://localhost:5000/api/signin', {
      email: inputState.input.email,
      password: inputState.input.password,
    }).then((res) => {
      console.log(res)
      localStorage.setItem('Token', res.token)
      localStorage.setItem('UserData', res.user)
      localStorage.setItem('loginStatus', 'logged')
      window.location.reload()
    }).catch((err) => {
      console.error(err)
    })
  }

  }


useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: googleClientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);  
});

const onSuccess = (res) => {
      console.log('success:', res);
      localStorage.setItem('Token', res.token)
      localStorage.setItem('UserData', res.user)
      localStorage.setItem('loginStatus', 'logged')
      window.location.reload()
};

const onFailure = (err) => {
  console.log('failed:', err);
};
  return (
    <div className='LoginContainer'>
      <div className='LoginInputContainer'>
      <img src='/Assets/Logo.svg' srcSet='/Assets/Logo.svg' id='logo'/>

        <div className='QuickLogin'>
        <GoogleLogin
          clientId={googleClientId}
          render={ renderProps =>
            (<button 
            onClick={renderProps.onClick}
              className='QuickBtn'>
                <img srcSet='/Assets/Google__G__Logo.svg' />
                Sign In With Google
          </button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
             

          
          
          <button className='QuickBtn'><img srcSet='/Assets/Facebook_f_logo_(2021).svg' />Sign In With Facebook</button>
        </div>
        <div className='InputSection'>
          <span className='Line'>
          <h6>Or Sign In Email</h6>
          </span>
          <div className='inputFiledLabel'>
          <label htmlFor="emailInput">Email address</label>
          <input 
              onChange={setEmail} 
              type={'email'} 
              id="emailInput" 
              name='emailInput' 
              placeholder='Insert your email' />
          </div>
          <div>
          <div className='passwordLabel'>
            <label htmlFor="passwordInput">Password</label>
            <p>Forgot Password?</p>
          </div>
            <input 
              onChange={setPassword} 
              type={'password'} 
              name="passwordInput" 
              id="passwordInput" />
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