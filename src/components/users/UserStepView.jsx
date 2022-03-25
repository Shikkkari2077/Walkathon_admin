import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserDetails, GetUserList, ResetPassword, AddAttendance, ClearAttendance} from '../../actions/HomeActions'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserStepView = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const userId = useParams()
  const dispatch = useDispatch()
  const UserDetails = useSelector(state => state.Walkathon.UserDetails);
  const UserList = useSelector(state => state.Walkathon.UserList);

  const [USER_DATA1, setUSER_DATA1] = useState(false)
  const [reset, setReset] = useState(false)
  const [password, setPassword] = useState({
    password:'',
    confirm_password:'',
  })

  useEffect(() => {
   var data = userId.id
   dispatch(GetUserDetails(data))
  }, [userId])

  useEffect(() => {
    dispatch(GetUserList())
  }, [])

  useEffect(() => {
  if(UserList){
    var Data = UserList.filter(data=>data.id==userId.id)
    setUSER_DATA1(Data[0])
  }
  }, [UserList])

  const handleChange =(e)=>{
    var {name, value} = e.target
    setPassword({...password,[name]:value})
  }

  const RESET =()=>{
    var data = {
      user_id:userId.id,
      password:password.password,
    }
    if(password.password==password.confirm_password){
      dispatch(ResetPassword(data))
    }else{
      toast.warning("Please Confirm The Password", {
        position: toast.POSITION.TOP_RIGHT
       
    });
    return false
    }
  }

  // useEffect(() => {
  //  if(USER_DATA1){
  //   axios.get(`https://walkathonapi.infoware.xyz/api/system-operations/managePassword/showPassword?user_id=${userId.id}`,config)
  //  }
  // }, [USER_DATA1])
  
  console.log('password',password);

  const [attendance, setAttendance] = useState('')

  const onAttendance =()=>{
    var data = {
      user_id:userId.id,
      attendance_no:attendance,
    }
    dispatch(AddAttendance(data))
  }

  const onAttendanceClear =()=>{
    var data = {
      user_id:userId.id,
    }
    dispatch(ClearAttendance(data))
  }

  return (
    <div>
       <div className="breadcrumb">
        <span>
          <Link to='/users/registered'><span class="material-icons-outlined">group</span>User</Link>/
          <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
        </span>
      </div>
      <div className="Header">
        <h2><span class="material-icons-outlined">data_saver_off</span>User Steps View</h2>
        <Link to='/users/registered'>
          BACK
        </Link>
      </div>
    {UserDetails?<>
      <div className="USER_STEP_VIEW">
        <div>
            <p>User Name</p>
            <span>{USER_DATA1.first_name} {USER_DATA1.last_name}</span>
        </div>
        <div>
            <p>Active Time</p>
            <span>{UserDetails.activeTime} Minutes</span>
        </div>
        <div style={{border:'none'}}>
            <p>Steps & Distance Summary</p>
        </div>
        <div className='stepAndDistance'>
          {UserDetails?UserDetails.data.map(data=>(
              <p>
                <span>{data.steps} Steps</span> <span>{data.distance.toFixed(2)} Meters</span>
              </p>
          )):null}
        </div>
        <div>
            <p>Total Steps</p>
            <span>{UserDetails.steps} Steps</span>
        </div>
        <div>
            <p>Total Distance</p>
            <span>{UserDetails.distance.toFixed(2)} Meters</span>
        </div>
        <div>
            <p>Type</p>
            <span>{UserDetails.type}</span>
        </div>
        <div>
            <p>Status</p>
            <span>{UserDetails.active?'Active':'Inactive'}</span>
        </div>
        <div>
            <p>Password</p>
            <span>{USER_DATA1.password}</span>
        </div>
    </div>
   
    </>:<div className="USER_STEP_VIEW">
       <h3>Sorry! No Data Available</h3>
    </div>}
    <div className='RESET_PASS'>
          <div className='HEAD_AT'>
            <button onClick={()=>setReset(!reset)}>Reset Password</button>
            <div>
              <input onChange={(e)=>setAttendance(e.target.value)} value={attendance} type="text" maxLength='4' placeholder='Attendance ID'/>
              <button onClick={onAttendance}>Submit</button>
              <button onClick={onAttendanceClear}>Clear</button>
            </div>
          </div>
          {reset?<div className='PASSWORD'>
            <input type="password" 
            placeholder='New Password' 
            name='password' 
            onChange={handleChange}
            value={password.password}/>

            <input type="password" 
            placeholder='Confirm Password' 
            name='confirm_password' 
            onChange={handleChange}
            value={password.confirm_password}/>
            <button onClick={RESET}>Submit</button>
          </div>:null}
    </div>
    
    </div>
  );
};

export default UserStepView;
