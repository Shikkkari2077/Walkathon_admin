import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetSponserList } from '../../actions/HomeActions'
import MUIDataTable from 'mui-datatables'
import { Link, useParams } from 'react-router-dom'


const SponsersLIST = () => {
    var Type = useParams()

    const dispatch = useDispatch()
    const [responsive, setResponsive] = useState('vertical');
    const SponsorList = useSelector(state => state.Walkathon.SponserList);

    const [SPONSOR, setSPONSOR] = useState(false)

    useEffect(() => {
        dispatch(GetSponserList())
    }, [])


    console.log('SPONSOR',SPONSOR);

    const columns = [
        {
          name: "SponsorImage",
          label: "Sponsor Image",
          options: {
            filter: true,
            sort: true,
            customHeadLabelRender:()=>{
              return<span style={{
                letterSpacing:'0',
                fontWeight:'600'
              }}>Sponsor Image</span>
            },
            customBodyRender: (SponsorImage)=>{
                return <>
                  {SponsorImage?<img className='SponserIMG' src={SponsorImage}/>:null}
                  {/* {SponsorImage?<img className='SponserIMG' src='/img/test.jpg'/>:null} */}
                </>
              }
          }
        },
        {
          name: "SponsorName",
          label: "Sponsor Name",
          options: {
            filter: true,
            sort: true,
            customHeadLabelRender:()=>{
              return<span style={{
                letterSpacing:'0',
                fontWeight:'600'
              }}>Sponsor Name</span>
            }
          },
        },
        {
          name: "SponsorType",
          label: "Sponsor Type",
          options: {
            filter: true,
            sort: true,
            customHeadLabelRender:()=>{
              return<span style={{
                letterSpacing:'0',
                fontWeight:'600'
              }}>Sponsor Type</span>
            }
          },
        },
        {
          name: "url",
          label: "Website URL",
          options: {
            filter: true,
            sort: true,
            customHeadLabelRender:()=>{
              return<span style={{
                letterSpacing:'0',
                fontWeight:'600'
              }}>Website URL</span>
            }
          }
        },
        {
          name: "SponsorId",
          label: "View",
          options: {
            filter: true,
            sort: true,
            customHeadLabelRender:()=>{
              return<span style={{
                letterSpacing:'0',
                fontWeight:'600'
              }}>View</span>
            },
            customBodyRender: (SponsorId)=>{
              return <>
                <Link to={`/sponsor/${'edit'}/${SponsorId}`}>
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
        rowsPerPage:3,
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
        <Link to='/sponsor'><span class="material-icons-outlined">local_atm</span>Sponsors</Link>/
        <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
      </span>
    </div>
    <div className="Header">
      <h2><span class="material-icons-outlined">price_change</span>Sponsors</h2>
      <Link to={`/sponsor/${'add'}/${'new'}`}>
        ADD SPONSOR
      </Link>
    </div>
     <MUIDataTable
        className="table-responsive"
        data={SponsorList?SponsorList:[]}
        columns={columns}
        options={options}
      />
  </div>
  )
}

export default SponsersLIST