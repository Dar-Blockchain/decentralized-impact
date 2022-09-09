import * as yup from 'yup'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import validator from 'validator';
import LoginImg from '../data/login.jpg'
import { Link} from 'react-router-dom';
import { LockClosedIcon, AtSymbolIcon, UserIcon, UsersIcon, PhoneIcon, LinkIcon } from '@heroicons/react/24/outline'
import { GoogleLogin } from 'react-google-login';
import {googleClientId} from '../config//googleClientId'
import { gapi } from 'gapi-script';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { useFormik } from 'formik';

const Login = () => {

  const {
    values,
    handleSubmit,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
        firstName:'',
        lastName:'',
        phone:'',
        linkedin:'',
        email:'',
        password:'',
        confPassword:'',
    },
    validationSchema:yup.object().shape({
        firstName: yup.string()
        .required("Required"),

        lastName: yup.string()
        .required("Required"),

        phone: yup.string()
        .min(8, "Must be more than 8 characters")
        .required("Required"),

        linkedin: yup.string()
        .required("Required"),

        email: yup.string()
        .email("Invalid email address")
        .required("Required"),

        password: yup.string()
        .min(7, "Must be more than 8 characters")
        .required("Required"),

        confPassword: yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Both password need to be the same"
            )
          })
    }),
    onSubmit(values) {
      console.log(values)
      testLogin(values)
      setValues({
        ...values,
        username:`@${values.email.split("@")[0]}`
      });
    }
  });
  useEffect(() => {
    if (values.email === "flaggedemail@mail.com") {
      // It could be a string or any other type
      setFieldValue("isEmailFlagged", { flagged: true, reason: "test" });
    }
  }, [values.email, setFieldValue]);

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const testLogin = () => {
    if (!(validator.isEmail(values.email))){
      errors("Email is not valid")
      return
  }
  else {
    
    axios.post('https://decentralized-impact.alwaysdata.net/api/signup', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
    }).then((res) => {
      console.log(res)
      window.location.replace('/')
    }).catch((err) => {
      console.error(err)
    })
  }}
useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: googleClientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);  
});
const onSuccessLinkedin = (res) =>{
  console.log(res);
};

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
    <div className='2xl:container h-screen m-auto'>
    <div hidden className='fixed inset-y-0 right-0 w-6/12 lg:block md:shrink-0 bg-[#F1F4F5]'>
        <img className=' w-10/12 object-cover'  src={LoginImg} alt="" />
    </div>
    
    <div className='relative h-full lg:w-6/12'>
        <div className='m-auto py-12 px-6 sm:p-20 xl:w-10/12'>
            <div className='space-y-8'>
                <a href="">
                    <img className='absolute left-6 top-7 h-10' alt="tailus logo" src='/Assets/Logo.svg' srcSet='/Assets/Logo.svg' id='logo' />
                </a>
                <p className='font-extrabold text-2xl text-gray-800'>Welcome to Decentralize Impact!<p className='font-medium text-base text-gray-400'>Sign up to have your own account</p> </p>
            </div>
            
            <div className='mt-12 grid gap-6 sm:grid-cols-2'>
            <GoogleLogin
          clientId={googleClientId}
          render={ renderProps =>
            (
              <button onClick={renderProps.onClick} className='py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200'>
                    <div className='flex gap-4 justify-center'>
                        <img srcSet='/Assets/Google__G__Logo.svg' className='w-5' alt=""/>
                        <span className='block w-max font-medium tracking-wide text-sm text-blue-700'>with  Google</span>
                    </div>
                </button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
        <LinkedIn
          clientId="86vhj2q7ukf83q"
          redirectUri={`${window.location.origin}/linkedin`}
          onSuccess={onSuccessLinkedin}
          onError={onFailure}>
            {({linkedInLogin}) =>(
              <button onClick={linkedInLogin} className='py-3 px-6 rounded-xl bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700'>
              <div className='flex gap-4 items-center justify-center text-white'>
                  <img srcSet='/Assets/linkedin-icon.svg' className='w-5' />
                  <span className='block w-max font-medium tracking-wide text-sm text-white'>with Linkedin</span>
              </div>
          </button>
            )}
          </LinkedIn> 
            </div>

            <div role="hidden" className="mt-12 border-t-1">
                <span class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">Or</span>
            </div>

            <form onSubmit={handleSubmit} action="" className="space-y-9 py-4">
            <div>
                    <label for="firstName" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">First Name</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <UserIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("firstName")}
                            id='firstName'
                            name='firstName'
                            type={'text'}
                            placeholder="Enter Your First Name"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["firstName"] && errors["firstName"]}
                    </span>
                     </label>
                    
                </div>
                <div>
                    <label for="lastName" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Last Name</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <UsersIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("lastName")}
                            id='lastName'
                            name='lastName'
                            type={'text'}
                            placeholder="Enter Your last Name"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["lastName"] && errors["lastName"]}
                    </span>
                     </label>
                    
                </div>
                <div>
                    <label for="phone" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Phone Number</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <PhoneIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("phone")}
                            id='phone'
                            name='phone'
                            type={'number'}
                            placeholder="Enter Your Phone Number"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["phone"] && errors["phone"]}
                    </span>
                     </label>
                    
                </div>
                <div>
                    <label for="linkedin" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Linkedin URL</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <LinkIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("linkedin")}
                            id='linkedin'
                            name='linkedin'
                            type={'url'}
                            placeholder="Enter Your Linkedin URL"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["linkedin"] && errors["linkedin"]}
                    </span>
                     </label>
                    
                </div>
                
                <div>
                    <label for="email" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Email Address</label>
                        <div className="text-sm w-max ml-auto">
                    </div>
                    <label class="relative text-gray-400 focus-within:text-gray-600 block">
                    <AtSymbolIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("email")}
                            type='email' 
                            id="email" 
                            name='email'
                            placeholder="Your Email"
                            className=" appearance-none block pl-12 w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                    <span className="text-red-600">
                        {touched["email"] && errors["email"]}
                    </span>
                    </label>
                </div>
                <div>
                    <label for="password" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Password</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <LockClosedIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("password")}
                            id='password'
                            name='password'
                            type={isRevealPwd ? "text" : "password"}
                            placeholder="Password"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["password"] && errors["password"]}
                    </span>
                    <img className="icon_button absolute right-4 top-3 "
                        src={isRevealPwd ? "" : ""}
                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                    />
                     </label>
                    
                </div>
                <div>
                    <label for="confPassword" className="block mb-4 text-sm font-semibold text-gray-500 dark:text-gray-300">Confirmed Password</label>
                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                    <LockClosedIcon className="pointer-events-none w-6 h-6 absolute top-6 transform -translate-y-1/2 left-3" />
                    <input 
                            {...getFieldProps("confPassword")}
                            id='confPassword'
                            name='confPassword'
                            type={isRevealPwd ? "text" : "password"}
                            placeholder="Confirm Your Password"
                            className="w-full py-3 px-6 ring-1 pl-12 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"       
                     />
                    <span className="text-red-600">
                        {touched["confPassword"] && errors["confPassword"]}
                    </span>
                    <img className="icon_button absolute right-4 top-3 "
                        src={isRevealPwd ? "" : ""}
                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                    />
                     </label>
                    
                </div>
                    
                <div>
                    <button type="submit" className="w-full px-6 py-3 rounded-xl bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                        <span className="font-semibold text-white text-lg">Sign Up</span>
                    </button>
                    <div className="mt-7">
                        <div className="flex justify-center items-center">
                            <label className="mr-2 text-gray-400" >Allready have an account</label>
                            <Link to="/" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login



