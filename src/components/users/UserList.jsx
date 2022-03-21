import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserList } from '../../actions/HomeActions'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'

const UserList = () => {
    const dispatch = useDispatch()
    const [responsive, setResponsive] = useState('vertical');
    const UserList = useSelector(state => state.Walkathon.UserList);

    useEffect(() => {
        dispatch(GetUserList())
    }, [])
    
    console.log('UserList',UserList);

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
      responsive,
  };

  return (
    <div>
      <div className="breadcrumb">
        <span>
          <Link to='/users/registered'><span class="material-icons-outlined">group</span>User</Link>/
          <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
        </span>
      </div>
      <div className="Header">
        <h2><span class="material-icons-outlined">data_saver_off</span> Registered Users</h2>
      </div>
       <MUIDataTable
          className="table-responsive"
          data={UserList?UserList:[]}
          columns={columns}
          options={options}
        />
    </div>
  )
}

export default UserList