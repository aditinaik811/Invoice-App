import  { useRef, useState } from 'react'
import '../login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth,storage, db } from '../../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {doc, setDoc } from 'firebase/firestore';
import loader from '../../assets/loader.gif';


const Register = () => {
  const fileInputRef = useRef(null)
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[file,setFile]=useState(null);
  const[displayName,setDisplayName] = useState('')
  const[imageUrl,setImageUrl]=useState('')
  const[isLoading,setISLoading] = useState(false);
  const navigate = useNavigate();

  const onSelecFile = (e)=>{
        setFile(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    setISLoading(true);
        console.log(email)
        console.log(password)
        //firebase authentication authentication code
        createUserWithEmailAndPassword(auth,email,password)
        .then(newUser=>{
            
            console.log(newUser)
            //user is created and now upload the image in firebase storage.
            const date = new Date().getTime()
            const storageRef = ref(storage,`${displayName+date}`)
            uploadBytesResumable(storageRef,file)
            .then(res=>{
                console.log(res)
                getDownloadURL(storageRef)
                .then(downloadedUrl=>{
                    console.log(downloadedUrl)
                    updateProfile(newUser.user,{
                        displayName:displayName,
                        photoURL:downloadedUrl
                    })

                    setDoc(doc(db,"users",newUser.user.uid),{
                        uid:newUser.user.uid,
                        displayName:displayName,
                        email:email,
                        photoURL:downloadedUrl
                    })
                    navigate('/dashboard')
                    setISLoading(false)
                    //to use the data in dashboard we will save them in local storage okay.
                    localStorage.setItem('cName',displayName)
                    localStorage.setItem('photoURL',downloadedUrl)
                    localStorage.setItem('email',newUser.user.email)
                    localStorage.setItem('uid',newUser.user.uid)

                })
                .catch(error=>{
                    console.log(error)
                    
                })
            })

        })
        .catch(err=>{
            console.log(err)
            setISLoading(false);
        })
  }
  return (
    <div className='login-wrapper'>
        <div className='login-container'>
            <div className='login-boxes login-left'>

            </div>
        
            <div className='login-boxes login-right'>
                    <h2 className='login-heading'>Create Your Account</h2>
                    <form onSubmit={submitHandler}>
                        <input required  className='login-input'  type='text' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input required className='login-input' type='text' placeholder='Company Name' onChange={(e)=>{setDisplayName(e.target.value)}}/>
                        <input required className='login-input' type='password' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                        <input required   ref = {fileInputRef} style={{display:'none'}} className='login-input' type='file' onChange={(e)=>{onSelecFile(e)}}/>
                        <input required onClick={()=>{fileInputRef.current.click()}} className='login-input' type='button' value='select your logo'/>
                        {imageUrl && (<img src={imageUrl} className="image-preview" alt="image-preview" />)}
                        <button className='login-input login-btn' type='submit'>{isLoading &&<img src={loader} style={{height:'20px',width:'20px'} }/>}Submit</button>
                    </form>
                    <Link to='/login' className='register-link'>Login with your Account</Link>
            </div>
        </div>
     
    </div>
  )
}

export default Register