import { React, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashBoard from './common/DashBoard';
import Login from './common/Login';
import SideNav from './common/SideNav';


function App() {
  
  const [user] = useState({
    email:localStorage.getItem('email'),
    token:localStorage.getItem('token'),
  })

  return (
    <div className='App'>
      {/* {user.email&&user.token?<DashBoard/>:<Login/>} */}
      <DashBoard/>
    </div>
  );
}

export default App;
