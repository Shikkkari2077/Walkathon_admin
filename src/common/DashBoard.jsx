import React from 'react'
import DataContainer from './DataContainer'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './SideNav'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";

const DashBoard = () => {

  const LogOut =()=>{
    localStorage.clear()
    toast.success("User Log Out Successfully!", {
      position: toast.POSITION.TOP_RIGHT
    });
    window.location.href='#/'
    window.location.reload()
    
  }

  return (
      <Router basename ='/'>
        <div div className="Navbar">
            <div className="head">
                <span class="material-icons-outlined">whatshot</span>
                <h2>Walkathon</h2>
            </div>
            <div>
                <span>{localStorage.getItem('userName')}</span>
                <span onClick={LogOut} class="material-icons-outlined">logout</span>
            </div>
        </div>
        <ToastContainer/>
        <div className='Main'>
            <SideNav/>
            <DataContainer/>
        </div>
    </Router>
  )
}

export default DashBoard