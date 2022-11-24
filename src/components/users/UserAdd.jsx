import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetAgeGroups, GetMedicalConditions, UserRegister} from '../../actions/HomeActions'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserAdd = () => {

    const dispatch = useDispatch()
   
    const AgeGroups = useSelector(state => state.Walkathon.AgeGroups);
    const Medicals = useSelector(state => state.Walkathon.Medicals);

    useEffect(() => {
      dispatch(GetAgeGroups())
      dispatch(GetMedicalConditions())
    }, [])
 
    
    const [userNew, setUserNew] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        age_group: '',
    })

    const onUSERChange = (e) =>{
        const {name, value} = e.target
        setUserNew({...userNew,[name]:value})
    }

   
    const [Medical, setMedical] = useState([{value:''}])

    const [medicalConditions, setMedicalConditions] = useState([])

    const optionHandleChange =(e,index)=>{
        const updatedOption = Medical.map((data,i)=> index==i?Object.assign(data,{[e.target.name]:e.target.value}):data)
        setMedical(updatedOption)
    }
    
   

    const AddMedical = () =>{
        var item = {value:''}
        setMedical([...Medical,item])
    }
    
    const RemoveMedical = (index) =>{

        const option = [...Medical]

            option.splice(index,1)

        setMedical(option)

    }

    useEffect(() => {
        var neW = Medical.map(data=>parseInt(data.value))

        setMedicalConditions(neW)

    }, [Medical])

    const onRegister = (e) =>{
        e.preventDefault()
        var data = {
            first_name: userNew.first_name,
            last_name: userNew.last_name,
            email: userNew.email,
            password: userNew.password,
            phone: userNew.phone,
            age_group:parseInt(userNew.age_group),
            medical_conditions:medicalConditions
        }

        // console.log('data',data);
        dispatch(UserRegister(data))
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
            <h2><span class="material-icons-outlined">data_saver_off</span>User Register</h2>
            <Link to='/users/registered'>
                BACK
            </Link>
        </div>

        <form onSubmit={onRegister} className='ADD_USER'>
            <div className="primary">
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                    id='first_name'
                    type="text"
                    name='first_name'
                    required
                    placeholder='First Name'
                    value={userNew.first_name}
                    onChange={onUSERChange}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                    id='last_name'
                    type="text"
                    name='last_name'
                    required
                    placeholder='Last Name'
                    value={userNew.last_name}
                    onChange={onUSERChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input 
                    id='phone'
                    type="text"
                    name='phone' 
                    required
                    placeholder='Phone'
                    value={userNew.phone}
                    onChange={onUSERChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                    id='email'
                    type="email" 
                    name='email'
                    required
                    placeholder='E-mail'
                    value={userNew.email}
                    onChange={onUSERChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    id='password'
                    type="password" 
                    name='password'
                    required
                    placeholder='Password'
                    value={userNew.password}
                    onChange={onUSERChange}
                    />
                </div>
            </div>
            <div className="secondary">
                <div>
                    <label htmlFor="age_group">Age Groups</label>
                    <select 
                    name="age_group" 
                    id="age_group"
                    required
                    onChange={onUSERChange}
                    value={userNew.age_group}
                    >
                        <option value=""> -- Select Age Group -- </option>
                        {AgeGroups?AgeGroups.map((data,i)=>(
                            <option value={data.id}>{data.name}</option>
                        )):null}
                    </select>
                </div>
                <div>
                    <div className='Add_div'>
                        <label htmlFor="medical_conditions">Medical Conditions</label>
                        <button onClick={AddMedical} htmlFor="">Add +</button>
                    </div>
                    {Medical.map((medi,index)=>(
                        <div className='condition'>
                            <select 
                            name="value"
                            value={medi.value}
                            onChange={(e)=>optionHandleChange(e,index)}
                            id="medical_conditions">
                                <option value=""> -- Select Medical Condition -- </option>
                                {Medicals?Medicals.map((condition,idx)=>(
                                    <option value={condition.id}>{condition.name}</option>
                                )):null}
                            </select>
                            <span onClick={()=>RemoveMedical(index)} class="material-icons-outlined">close</span>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="third">
                <button type='submit'>Register</button>
            </div>
        </form>

    </div>
  );
};

export default UserAdd;
