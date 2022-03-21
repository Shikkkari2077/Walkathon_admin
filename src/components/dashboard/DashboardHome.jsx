import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetSponserList, GetUserList, GetParticipantsList } from '../../actions/HomeActions'
import { Link, useParams } from 'react-router-dom'

const DashboardHome = () => {

    const dispatch = useDispatch()

    const SponsorList = useSelector(state => state.Walkathon.SponserList);
    const UserList = useSelector(state => state.Walkathon.UserList);
    const Participants = useSelector(state => state.Walkathon.Participants);

    useEffect(() => {
        dispatch(GetUserList())
        dispatch(GetSponserList())
        dispatch(GetParticipantsList())
    }, [])


    console.log('Participants',Participants);
  return (
    <div>
        <div className="breadcrumb">
        <span>
            {/* <Link to='/users'><span class="material-icons-outlined">local_atm</span>Dashboard</Link>/ */}
            <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
        </span>
        </div>
        <div className="Header">
        <h2><span class="material-icons-outlined">dashboard_customize</span>Dashboard</h2>
        </div>
        <div className='DashBoardCARDS'>
            <div className="CARD">
                <p><span class="material-icons-outlined">people</span>{UserList.length}</p>
                <span>Users</span>
            </div>
            <div className="CARD">
                <p><span class="material-icons-outlined">price_change</span>{SponsorList.length}</p>
                <span>Sponsers</span>
            </div>
             <div className="CARD">
                <p><span class="material-icons-outlined">groups</span>{Participants}</p>
                <span>Participants</span>
            </div>
        </div>
    </div>
    )
}

export default DashboardHome