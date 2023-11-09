import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        localStorage.setItem("logged", res.data[0].id)
        navigate("/poolhome");
      })
      .catch((err) => console.log(err));
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
          <button type="submit" class="btn mt-3">
            Login
          </button>
        </form>
        <div class="text-center fs-6">
          <a href="#">Forget password?</a> or <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
