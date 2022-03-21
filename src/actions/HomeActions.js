import {
    SET_USER_LIST,
    SET_SPONSER_LIST,
    SET_USER_DETAILS,
    SET_PARTICIPANTS_LIST,
} from './Types'

import Constant from '../Constant'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import axios from 'axios';


const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


export const onLogin = (data) => (dispatch)=>{
axios
    .post(Constant.getAPI() + `/system/sign-in`,data)
    .then((res) => {
       if(res.data){
            toast.success("User Logged In Successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });

            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userName',res.data.data.userName)
            localStorage.setItem('email',res.data.data.email)

            window.location.reload()
       }
    })
    .catch((err) => {
        toast.error("User ID or Password is Wrong", {
            position: toast.POSITION.TOP_RIGHT
        });
    });
};


export const GetUserList = (data) => (dispatch)=>{

    axios
      .get(Constant.getAPI() + `/system-operations/list-users`, config)
      .then((res) => {
          console.log(res.data.data);

          dispatch({
              type:SET_USER_LIST,
              payload:res.data.data
          })

      })
      .catch((err) => {
        console.log(err.message);
      });
  };


export const GetSponserList = (data) => (dispatch)=>{

axios
    .get(Constant.getAPI() + `/sponsors/listSponsors`, config)
    .then((res) => {
        console.log(res.data.data);

        dispatch({
            type:SET_SPONSER_LIST,
            payload:res.data.data
        })

    })
    .catch((err) => {
    console.log(err.message);
    });
};

export const GetUserDetails = (data) => (dispatch)=>{

    axios
        .get(Constant.getAPI() + `/system-operations/get-user-activity-list?userId=${data}`, config)
        .then((res) => {
            // console.log(res.data.data);
    
            dispatch({
                type:SET_USER_DETAILS,
                payload:res.data.data[0]
            })
    
        })
        .catch((err) => {
        console.log(err.message);
        });
    };

    export const GetParticipantsList = (data) => (dispatch)=>{

        axios
            .get(Constant.getAPI() + `/user/counter/getTotalParticipants`, config)
            .then((res) => {
                console.log(res.data.data);
        
                dispatch({
                    type:SET_PARTICIPANTS_LIST,
                    payload:res.data.data
                })
        
            })
            .catch((err) => {
            console.log(err.message);
            });
        };

    export const ResetPassword = (data) => (dispatch)=>{

        axios
            .put(Constant.getAPI() + `/system-operations/updateDetails`,data, config)
            .then((res) => {
                if(res.data.success){
                    toast.success("Password Reset Successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    window.location.reload()
                }
                
            })
            .catch((err) => {
            console.log(err.message);
            });
        };