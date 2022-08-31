import React from 'react'
import './login.css'

const Login = () => {
  const testLogin = () => {
    console.log('qsd')
  }
  return (
    <div className='LoginContainer'>
      <div className='LoginInputContainer'>
        <div className='QuickLogin'>
          <button className='QuickBtn'><img srcSet='/Assets/Google__G__Logo.svg' />Sign In With Google</button>
          <button className='QuickBtn'><img srcSet='/Assets/Facebook_f_logo_(2021).svg' />Sign In With Facebook</button>
        </div>
        <div className='InputSection'>
          <span className='Line'>
          <h6>Or Sign In Email</h6>
          </span>
          <div>
          <label htmlFor="emailInput">Email address</label>
          <input type={'email'} id="emailInput" name='emailInput' placeholder='Insert your email' />
          </div>
          <div>
          <div className='passwordLabel'>
            <label htmlFor="passwordInput">Password</label>
            <p>Forgot Password?</p>
          </div>
            <input type={'password'} name="passwordInput" id="passwordInput" />
          </div>
            <button className='LoginBtn' onClick={testLogin}>Login</button>
          </div>
          <p>Already have an account? Sign Up</p>
      </div>

      <div className='MediaSection'>
        <img srcSet='/Assets/Rectangle.svg' alt='' id='MediaSecBg'/>
      </div>
    </div>
  )
}

export default Login