import React from 'react'
import '../../component/dashboard/Dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {auth} from '../../firebase'
import {signOut} from 'firebase/auth'
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
const Dashboard = () => {
 const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        navigate('/login')

      })
      .catch((error) => {
        console.log(error)
      });
  };




  return (
    <div className='dashboard-wrapper'>
        <div className='side-nav'>
          <div className='profile-info'>
            <img src={localStorage.getItem('photoURL')}/>
            <div>
              <p>{localStorage.getItem('cName')}</p>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
          <hr></hr>
          <div className='menu'>
          <Link to='/dashboard/home' className="menu-link"><HomeIcon/>Home</Link>
          <Link to='/dashboard/invoices' className="menu-link"><ReceiptIcon/>Invoices</Link>
          <Link to='/dashboard/new-invoice' className="menu-link"><PostAddIcon/>New Invoices</Link>
          <Link to='/dashboard/settings' className="menu-link"><SettingsIcon/>Settings</Link>
          </div>
        </div>
        <div className='main-container'>
              <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard