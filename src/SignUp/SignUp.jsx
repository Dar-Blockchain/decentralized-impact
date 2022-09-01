import React from 'react';
import './SignUp.css'
import { useState } from 'react';
import axios from 'axios';
import validator from 'validator'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
function SignUp(){

    let Navigate = useNavigate();
    const [inputState, setInput] = useState({input: {firstName: '', lastName: '', email: '', password: '', password_2: ''}})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    function setEmail(event){
        setInput({...inputState, input:{lastName: inputState.input.lastName, firstName: inputState.input.firstName, email: event.target.value, password: inputState.input.password, password_2: inputState.input.password_2}})
    }

    function setpassword(event){
        setInput({...inputState, input:{lastName: inputState.input.lastName, firstName: inputState.input.firstName, email: inputState.input.email ,password: event.target.value, password_2: event.target.value}})
    }
    function setFirstName(event){
      console.log(event.target.value)
      // check if username is valid
      if (validator.isAlphanumeric(event.target.value)){
          setInput({...inputState, input:{email: inputState.input.email, password: inputState.input.password, password_2: inputState.input.password_2, firstName: event.target.value, lastName: inputState.input.lastName}})
      }
      else{
          setError('Username must be alphanumeric')
      }  
    }

    function setLastName(event){
      // check if username is valid
      if (validator.isAlphanumeric(event.target.value)){
          setInput({...inputState, input:{email: inputState.input.email, password: inputState.input.password, password_2: inputState.input.password_2,  firstName: inputState.input.firstName, lastName: event.target.value}})
      }
      else{
          setError('Username must be alphanumeric')
      }  
    }
      
     
    function handleSubmit() {
        if (!(validator.isEmail(inputState.input.email))){
            setError("Email is not valid")
            return
        }
        else if (inputState.input.password.length < 8){
            setError("Password must be at least 8 characters")
            return
        }
        else if (inputState.input.password !== inputState.input.password_2){
            setError("Passwords do not match")
        }

        else{
          console.log(inputState.input.firstName)
          console.log(inputState.input.lastName)

            axios.post('http://localhost:3000/api/signup', {
              firstName: inputState.input.firstName,
              lastName: inputState.input.lastName,
              email: inputState.input.email, 
              password: inputState.input.password
            })
            .then(res => {
                console.log(res)
                console.log('hola')
            })
            .catch(err => {
                    console.log(err)
            })
            return
        }
    }

return (
    
    <div fluid className='d-flex justify-content-center my-3 login-container'>    
    <div>
                <div className="col-md-12 login-form-1">
                            <h3>Sign Up</h3>
     
                            {error && (<h4 className='text-center text-danger'>{error}</h4>)}

                            <form>
                            {/* firstName & lastName */}
                            <div className="form-group my-2">
                              <input type="text" className="form-control" placeholder="Your firstname"  onChange={setFirstName} value={inputState.input.firstName} />
                            </div>
                          <div className="form-group my-2">
                            <input type="text" className="form-control" placeholder="Your lastname"  onChange={setLastName} value={inputState.input.lastName} />
                          </div>
                            <div className="form-group my-2">
                                    <input type="text" className="form-control" placeholder="Your Email *" onChange={setEmail} value={inputState.input.email} />
                                </div>
                                <div className="form-group my-2">
                                    <input type="password" className="form-control" placeholder="Your Password *" value={inputState.input.password} onChange={setpassword}/>
                                    <input type="password" className="form-control" placeholder="Confirm Your Password *"/>
                                </div>
                                <input type="button" className="btnSubmit my-3 mx-auto" onClick={handleSubmit} value="Submit"/>
                            </form>
                </div>
        </div>
    
    </div>
 );

}


export default SignUp