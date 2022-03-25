import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserList } from '../../actions/HomeActions'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'

const TopUsers = () => {
    const dispatch = useDispatch()
    const [responsive, setResponsive] = useState('vertical');
    const UserList = useSelector(state => state.Walkathon.UserList);
    const [USER, setUSER] = useState(false)
    useEffect(() => {
        dispatch(GetUserList())
    }, [])

    const [Mobile, setMobile] = useState('')
    const [Email, setEmail] = useState('')

    useEffect(() => {
     if(UserList){
      var newList = UserList.sort((a,b)=> b.stepData.distance - a.stepData.distance)
      var newList2 = newList.filter(data=>data.stepData.distance!==0).slice(0,50)
      setUSER(newList2)
     }
  }, [UserList])

  useEffect(() => {
    if(UserList){
        if(Mobile){
         var Filtered = USER.filter(data=>data.phone.includes(Mobile))
         setUSER(Filtered)
        }else{
          var newList = UserList.sort((a,b)=> b.stepData.distance - a.stepData.distance)
          var newList2 = newList.filter(data=>data.stepData.distance!==0).slice(0,50)
          setUSER(newList2)
        }
    }
 }, [Mobile])

 useEffect(() => {
    if(UserList){
      if(Email){
        var Filtered = USER.filter(data=>data.email.toUpperCase().includes(Email.toUpperCase()))
        setUSER(Filtered)
       }else{
        var newList = UserList.sort((a,b)=> b.stepData.distance - a.stepData.distance)
        var newList2 = newList.filter(data=>data.stepData.distance!==0).slice(0,50)
        setUSER(newList2)
       }
    }
 }, [Email])
    
    
    console.log('USER',USER);

  const columns = [
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>First Name</span>
        }
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Last Name</span>
        }
      }
    },
    {
      name: "age_group",
      label: "Age Group",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Age Group</span>
        },
        customBodyRender: (age_group)=>{
          return <>
            {age_group?age_group.map((age,idx)=>(
              <span>{age.name}</span>
            )):null}
          </>
        }
      }
    },
    {
      name: "medical_conditions",
      label: "Medical Conditions",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Medical Conditions</span>
        },
        customBodyRender: (medical_conditions)=>{
          return <>
            {medical_conditions?medical_conditions.map((condition,idx)=>(
              <span>{condition.name}, </span>
            )):null}
          </>
        }
      }
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Phone</span>
        },
      }
    },
    {
      name: "stepData",
      label: "Total Distance",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Total Distance</span>
        },
        customBodyRender: (stepData)=>{
          return <>
            {stepData.distance?stepData.distance.toFixed(0):0} Meters
          </>
      }
    },
  },
  {
    name: "stepData",
    label: "Total Steps",
    options: {
      filter: true,
      sort: true,
      customHeadLabelRender:()=>{
        return<span style={{
          letterSpacing:'0',
          fontWeight:'600'
        }}>Total Steps</span>
      },
      customBodyRender: (stepData)=>{
        return <>
          {stepData.steps?stepData.steps:0}
        </>
    }
  },
},
{
  name: "attendance_no",
  label: "Attendance No",
  options: {
    filter: true,
    sort: true,
    customHeadLabelRender:()=>{
      return<span style={{
        letterSpacing:'0',
        fontWeight:'600'
      }}>Attendance No</span>
    },
    customBodyRender: (attendance_no)=>{
      return <>
        {attendance_no?attendance_no:' '}
      </>
  }
},
},
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender:()=>{
          return<span style={{
            letterSpacing:'0',
            fontWeight:'600'
          }}>Action</span>
        },
        customBodyRender: (id)=>{
          return <>
            <Link to={`/users/${id}`}>
              <span style={{color:'#363636'}} class="material-icons-outlined">visibility</span>
            </Link>
          </>
        }
      }
    },
    
    
  ];

  const options = {
      filterType: "dropdown",
      search:false,
      filter:false,
      viewColumns: false,
      print: false,
      pagination:true,
      download: false,
      selectableRows: "none",
      responsive: 'scrollMaxHeight',
  };
  return (
    <div>
      <div className="breadcrumb">
        <span>
          <Link to='/users/active'><span class="material-icons-outlined">group</span>User</Link>/
          <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
        </span>
      </div>
      <div className="Header">
        <h2><span class="material-icons-outlined">data_saver_off</span> Top Users</h2>
        <Link to='/users/Add'>
                ADD USER
        </Link>
      </div>
      <div className="FILTERS">
        <input onChange={(e)=>setMobile(e.target.value)} value={Mobile} type="text" placeholder='Searc By Mobile Number' />
        <input onChange={(e)=>setEmail(e.target.value)} value={Email} type="text" placeholder='Searc By Email Address' />
      </div>
       <MUIDataTable
          className="table-responsive"
          data={USER?USER:[]}
          columns={columns}
          options={options}
        />
    </div>
  )
}

export default TopUsers