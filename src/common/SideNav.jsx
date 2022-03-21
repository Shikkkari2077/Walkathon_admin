import {React,useState, useEffect} from "react";
import { Link,useLocation } from "react-router-dom";


const SideNav = () => {
  
  const [drop1, setDrop1] = useState(false)
  const [drop2, setDrop2] = useState(false)
  const [drop3, setDrop3] = useState(false)

  const [navActive, setNavActive] = useState(1);

  let location = useLocation()

  useEffect(() => {
    if(location.pathname.includes('/')){
        setNavActive(1)
    }
    if(location.pathname.includes('/users')){
        setNavActive(2)
    }
    if(location.pathname.includes('/banners')){
        setNavActive(3)
    }
    if(location.pathname.includes('/sponsor')){
        setNavActive(4)
    }
  }, [navActive,location.pathname]);

  return (
    <div className="SideNavbar">
      <ul className="NavLinks">
        
        <Link to="/" className="navLink"  onClick={()=>setNavActive(1)}>
          <li className={navActive==1?"Link LinkActive":"Link"}>
           <p><span class="material-icons-outlined">dashboard</span>Dashboard</p>
          </li>
        </Link>

        <Link  to="#" className="navLink" onClick={()=>setNavActive(2)}>
          <li className={navActive==2?"Link LinkActive":"Link"} onClick={()=>setDrop1(!drop1)}>
            <p><span class="material-icons-outlined">people</span>User Master</p>
            <span class="material-icons-outlined">{drop1?'arrow_drop_down':'arrow_left'}</span>
          </li>
            {drop1?<ul className="subnavLINKS">
              <Link to="/users/registered" className="subnavLink">
                <li>
                  <span class="material-icons-outlined">navigate_next</span>Registered
                </li>
              </Link>
              <Link to="/users/active" className="subnavLink">
                <li>
                  <span class="material-icons-outlined">navigate_next</span>Are Active
                </li>
              </Link>
            </ul>:null}
        </Link>

        {/* <Link to="#" className="navLink"  onClick={()=>setNavActive(3)}>
          <li className={navActive==3?"Link LinkActive":"Link"} onClick={()=>setDrop2(!drop2)}>
            <p><span class="material-icons-outlined">wallpaper</span>Banners</p>
            <span class="material-icons-outlined">{drop2?'arrow_drop_down':'arrow_left'}</span>
          </li>
          {drop2?<ul className="subnavLINKS">
              <Link to="/banners" className="subnavLink">
                <li>
                  <span class="material-icons-outlined">navigate_next</span>Home Banners
                </li>
              </Link>
              <Link to="/banners" className="subnavLink">
                <li>
                  <span class="material-icons-outlined">navigate_next</span>In-App Banners
                </li>
              </Link>
            </ul>:null}
        </Link> */}

        <Link to="#" className="navLink"  onClick={()=>setNavActive(4)}>
          <li className={navActive==4?"Link LinkActive":"Link"} onClick={()=>setDrop3(!drop3)}>
            <p><span class="material-icons-outlined">local_atm</span>Sponsor Master</p>
            <span class="material-icons-outlined">{drop3?'arrow_drop_down':'arrow_left'}</span>
          </li>
          {drop3?<ul className="subnavLINKS">
              <Link to={`/sponsor`} className="subnavLink">
                <li>
                  <span class="material-icons-outlined">navigate_next</span>Sponsers
                </li>
              </Link>
            </ul>:null}
        </Link>

      </ul>
    </div>
  );
};

export default SideNav;
