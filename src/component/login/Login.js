import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import loader from '../../assets/loader.gif';
const Login = () => {
const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const navigate = useNavigate();
 const[isLoading,setISLoading] = useState(false);

const submitHandler = (e)=>{
  setISLoading(true);
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    localStorage.setItem('cName',user.displayName)
    localStorage.setItem('photoURL',user.photoURL)
    localStorage.setItem('email',user.email)
    localStorage.setItem('uid',user.uid)
    navigate('/dashboard')
    setISLoading(false)

  })
  .catch((error) => {
    console.log(error)
    setISLoading(false)
});
}

  return (
    <div className='login-wrapper'>
        <div className='login-container'>
            <div className='login-boxes login-left'>

            </div>
            <div className='login-boxes login-right'>
                    <h2 className='login-heading'>Login</h2>
                    <form onSubmit={submitHandler}>
                        <input className='login-input'  type='text' required placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input className='login-input' type='password' required placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button className='login-input login-btn' type='submit'>{isLoading &&<img src={loader} style={{height:'20px',width:'20px'}}/>}Submit</button>
                    </form>
                    <Link to='/register' className='register-link'>Create an Account</Link>
            </div>
        </div>
     
    </div>
  )
}

export default Login