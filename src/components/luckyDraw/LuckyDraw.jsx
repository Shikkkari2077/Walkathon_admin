import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetUserList } from "../../actions/HomeActions";

import "./LuckyDraw.css";

const LuckyDraw = () => {
  const dispatch = useDispatch();
  const UserList = useSelector((state) => state.Walkathon.UserList);

  const [name, setName] = useState("circle");
  const [Random, setRandom] = useState(null);
  const [AttUSER, setAttUSER] = useState(false);
  
  const [Winner, setWinner] = useState(false);
  
  const [WinnerLIST, setWinnerLIST] = useState([]);

  useEffect(() => {
    var Winners = localStorage.getItem('WINNERS')
    if(!Winners){
      localStorage.setItem('WINNERS',JSON.stringify(WinnerLIST))
    }
    dispatch(GetUserList());
  }, []);

  useEffect(() => {
    var Winners = JSON.parse(localStorage.getItem('WINNERS'))

    if (UserList) {
      var newList = UserList.filter((data) => data.attendance_no !== null);
      var secList = newList.filter(data=>!Winners.includes(data.id))
      setAttUSER(secList);
    }
  }, [UserList]);



  useEffect(() => {
    
    if(WinnerLIST.length>0){
      localStorage.setItem('WINNERS',JSON.stringify(WinnerLIST))
    }
    
    var Winners = JSON.parse(localStorage.getItem('WINNERS'))

    if(WinnerLIST.length>0){
      var newList = AttUSER.filter(data=>!Winners.includes(data.id))
      setAttUSER(newList);
    }

    console.log("WINNERS", Winners);

  }, [WinnerLIST])
  

  const StartRotation = () => {
  
    var attCount = AttUSER.length-1;

    setName("circle start_rotate");

    var RandomValue = Math.floor(Math.random() * 4000) + 1;
    var RandomValueForWinner = Math.floor(Math.random() * attCount) + 1;

    setRandom(RandomValue);

    setWinner(false);
    setTimeout(() => {
      setName("circle start_rotate stop_rotate");
    
      setWinner(AttUSER[RandomValueForWinner]);

      setWinnerLIST([...WinnerLIST,AttUSER[RandomValueForWinner].id])
    }, RandomValue);
  };

  console.log("AttUSER", AttUSER);
  console.log("UserList", UserList);
  
  return (
    <div>
      <div className="breadcrumb">
        <span>
          <Link to="/lucky-draw">
            <span class="material-icons-outlined">star_half</span>Lucky Draw
          </Link>
          /
          <Link to="/">
            <span class="material-icons-outlined">home</span>Home
          </Link>
        </span>
      </div>
      <div className="Header">
        <h2>
          <span class="material-icons-outlined">star_half</span>Lucky Draw
        </h2>
      </div>
      <div className="Spinner">
        <div className="leftContainer">
          <h2>
            <span class="material-icons-outlined">hotel_class</span> Winner
          </h2>
          {Winner ? (
            <>
            <h4>Attendance No: 
              <span>
                {Winner ? `${Winner.attendance_no}` : "null"}
              </span>{" "}
            </h4>
            <h3>
              <span>
                {Winner ? `${Winner.first_name} ${Winner.last_name}` : "null"}
              </span>{" "}
            </h3>
            </>
          ) : (
            <h3>
              Spin The Wheel Find New Winner
            </h3>
          )}
        </div>
        <div className="rightContainer">
          <ul className={name}>
            <li>
              <div className="text">
                <span class="material-icons-outlined">hotel_class</span>
              </div>
            </li>
            <li>
              <div className="text">
                <span class="material-icons-outlined">savings</span>
              </div>
            </li>
            <li>
              <div className="text">
                <span class="material-icons-outlined">bug_report</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">loyalty</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">nightlight_round</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">accessible</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">satellite_alt</span>
              </div>
            </li>
            <li>
              <div className="text">
                <span class="material-icons-outlined">assured_workload</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">campaign</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">notifications_active</span>
              </div>
            </li>
            <li>
              <div className="text">
              <span class="material-icons-outlined">emoji_emotions</span>
              </div>
            </li>
            <li>
              <div className="text">
                <span class="material-icons-outlined">coronavirus</span>
              </div>
            </li>
          </ul>
          <button onClick={StartRotation}>Find The Winner</button>
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw;
