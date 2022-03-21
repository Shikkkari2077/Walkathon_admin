import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetSponserList } from '../../actions/HomeActions'
import { Link, useParams } from 'react-router-dom'

const SponserEDIT_ADD = () => {
    const method = useParams()
    console.log('method',method);
    const dispatch = useDispatch()
    const SponsorList = useSelector(state => state.Walkathon.SponserList)

   
    const [sponsor, setSponsor] = useState({
        SponsorImage: "",
        SponsorName: "",
        SponsorType: "",
        url: "",
    })

    const [imgDATA, setimgDATA] = useState(false)
    const [imgURL, setimgURL] = useState(false)

    useEffect(() => {
      if(!method.SponsorId=='new'){
        dispatch(GetSponserList())
      }
    }, [method.SponsorId])
    
    useEffect(() => {
        if(SponsorList&&method.method=='edit'){
            var spr = SponsorList.filter(data=>data.SponsorId==method.SponsorId)
           setSponsor(spr[0])
           setimgURL(spr[0].SponsorImage)
        }
       }, [SponsorList])
    
    console.log('sponsor',sponsor);
    console.log('imgURL',imgURL);
       
   

    const handleChange =(e)=>{
        const {name, value} = e.target
        setSponsor({...sponsor,[name]:value})
    }
    const ImagesToUpload = (e)=>{
        var imgurl = URL.createObjectURL(e.target.files[0])
        var imgdata = e.target.files[0]
        setimgURL(imgurl)
        setimgDATA(imgdata)
        
    }
    console.log('imgDATA',imgDATA);
    console.log('imgURL',imgURL);
  return (
    <div>
    <div className="breadcrumb">
      <span>
        <Link to='/sponsor'><span class="material-icons-outlined">local_atm</span>Sponsors</Link>/
        <Link to='/'><span class="material-icons-outlined">home</span>Home</Link>
      </span>
    </div>
    <div className="Header">
      <h2><span class="material-icons-outlined">price_change</span>Sponsor {method.method}</h2>
      <Link to='/sponsor'>
        BACK
      </Link>
    </div>
    <form className="SponserADD_EDIT">
        <div className='IMG_DIV'>
            {/* {imgURL?<div style={{background :`url(${imgURL}) no-repeat center/cover`}}>
            </div>:<span>No Image Yet!</span>} */}
            {imgURL?<img src={imgURL} alt="" />:<span>No Image Yet!</span>}
        </div>
        <div className='inputFIELDimg'>
            <label htmlFor="SponsorImage">Choose Image</label>
            <input onChange={ImagesToUpload} id='SponsorImage' type="file" hidden accept="image/png, image/gif, image/jpeg"/>
        </div>
        <div className='inputFIELD'>
            <label htmlFor="SponsorName">Sponsor Name</label>
            <input value={sponsor.SponsorName} onChange={handleChange} name='SponsorName' id='SponsorName' type="text" placeholder='Sponsor Name'/>
        </div>
        <div className='inputFIELD'>
            <label htmlFor="SponsorType">Sponsor Type</label>
            <select value={sponsor.SponsorType} onChange={handleChange} name="SponsorType" id="SponsorType" >
                <option value="Diamond">Diamond</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
            </select>
        </div>
        <div className='inputFIELD'>
            <label htmlFor="url">Sponsor Website</label>
            <input value={sponsor.url} onChange={handleChange} name='url' id='url' type="text" placeholder='Sponsor Website URl' />
        </div>
        <div className="inputFIELD">
            <button type='submit'>SUBMIT</button>
        </div>
    </form>
  </div>
  )
}

export default SponserEDIT_ADD