import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onLogin } from "../actions/HomeActions";



const Login = () => {
  
  const dispatch = useDispatch()

  const [logn, setLogn] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogn({
      ...logn,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    setErrors(() => {
      let err = {};

      //Email
      if (!logn.email) {
        err.email = "Email required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(logn.email)) {
        err.email = "Email address is invalid";
      }

      //password
      if (!logn.password) {
        err.password = "Password is required";
      } else if (logn.password.length < 4) {
        err.password = "Password needs to be 4 characters or more";
      }

      return err;
    });

    if(!Object.keys(errors).length>0){

      var data ={
        email: logn.email,
        password: logn.password,
      }

      dispatch(onLogin(data))
    }

  };

  return (
    <div className="logInPage">
       <ToastContainer/>
      <div className="log-right">
        <h1><span class="material-icons-outlined">whatshot</span>Walkathon</h1>
        <form onSubmit={loginSubmit} className="log-form">
            <div className="formInputs">
              <label htmlFor="email" className="l-label">
                E-mail ID
              </label>
              <input
                type="text"
                name="email"
                className="inputl"
                placeholder="Enter registered email id"
                value={logn.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="formInputs">
              <label htmlFor="password" className="l-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="inputl"
                placeholder="Enter your password"
                value={logn.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="sign-up">
              <button  type="submit" className="SignUpBtn">
                Log In
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;
