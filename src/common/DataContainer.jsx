import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserList from '../components/users/UserList';
import ActiveUsers from '../components/users/ActiveUsers';
import SponsersLIST from '../components/sponsers/SponsersLIST';
import DashboardHome from '../components/dashboard/DashboardHome';
import SponserEDIT_ADD from '../components/sponsers/SponserEDIT_ADD';
import UserStepView from '../components/users/UserStepView';

const DataContainer = () => {
  return (
       <div className='DataContainer'>
           <ToastContainer/>
            <Routes>
                <Route exact path='/' element={<DashboardHome />}/>

                <Route exact path='/users/registered' element={<UserList />}/>
                <Route exact path='/users/active' element={<ActiveUsers />}/>
                <Route exact path='/users/:id' element={<UserStepView />}/>

                <Route exact path='/sponsor' element={<SponsersLIST />}/>
                <Route exact path='/sponsor/:method/:SponsorId' element={<SponserEDIT_ADD />}/>
            </Routes>
       </div>
  )
}

export default DataContainer