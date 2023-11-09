import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure()

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState('');
  const navigate = useNavigate();

//   const notify = ()=>{
 
//     toast.error(error,{position: toast.POSITION.TOP_CENTER})
// }

  const handleInput = (event) => {
    console.log(values);
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    console.log(event.target.name);

    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        navigate("/");
      })
      .catch(error => {
        console.log(error.response.data);
        // setError(error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-center",
        })
      });
  };

  return (
    <div>
      <div class="wrapper">
        <div class="logo">
          <img
            src="https://cdn.dribbble.com/users/12348082/screenshots/18685499/carpool_logo.png"
            alt=""
          />
        </div>
        <div class="text-center mt-4 name">CarPool</div>
        <form class="p-3 mt-3" action="" onSubmit={handleSubmit}>
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>

            <input
              type="text"
              name="name"
              id="userName"
              placeholder="Name"
              onChange={handleInput}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>

            <input
              type="email"
              name="email"
              id="userName"
              placeholder="Email"
              onChange={handleInput}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              onChange={handleInput}
            />
          </div>
          <button class="btn mt-3">Signup</button>
        </form>
        <div class="text-center fs-6">
          <Link to="/">Login</Link>
        </div>
      </div>
      <ToastContainer />
      
    </div>
  );
}

export default Signup;
