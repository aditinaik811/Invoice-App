import './Dashboard.css'
import { useState,useRef } from 'react';
import { storage,auth,db } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';



const Setting = () => {
  const fileInputRef = useRef(null);
  const[email,setEmail] = useState(localStorage.getItem('email'));
  const[password,setPassword] = useState('');
  const[file,setFile]=useState(null);
  const[displayName,setDisplayName] = useState(localStorage.getItem('cName'))
  const[imageUrl,setImageUrl]=useState(localStorage.getItem('photoURL'))

const updateCompanyName =()=>{
      updateProfile(auth.currentUser,{
        displayName:displayName,
      })
      .then(res=>{
      
        localStorage.setItem('cName',displayName)
        updateDoc(doc(db,"users",localStorage.getItem('uid')),{
          displayName:displayName
        })
        .then(res=>{
            window.location.reload();
        })

      })
}
  
 const onSelectFile = (e)=>{
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const updateLogo = ()=>{
    const fileRef = ref(storage,localStorage.getItem('photoURL'))
    //location_path madi te photoche url asa no new image ami tyaach zagyaar gaaltat so url will be same only.
    console.log(fileRef._location.path_)
    const storageRef = ref(storage,fileRef._location.path_)
    uploadBytesResumable(storageRef,file)
    .then(result=>{
      window.location.reload();
    })
  }
  
  return (
    <div>
        <p>Settings</p>
        <div className='setting-wrapper'>
          <div className='profile-info update-cName'>
          <img onClick={()=>{fileInputRef.current.click()}} src={imageUrl} alt='profile-pic'/>
          <input onChange={(e)=>{onSelectFile(e)}} type='file' ref={fileInputRef} style={{display:'none'}}/>
          {file && <button onClick={()=>{updateLogo()}} style={{width:'30%',padding:'10px',backgroundColor:'hotpink'}}>Update Profile Picture</button>}
          </div>
          <div className='update-cName'>
            <input onChange={(e)=>{setDisplayName(e.target.value)}} type='text' placeholder='Company Name' value={displayName}/>
            <button onClick={()=>{updateCompanyName()}}>Update Company Name</button>

          </div>
        </div>
        
    </div>
  )
}

export default Setting