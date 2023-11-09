import { all } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllPool from "./AllPool";
import MyPool from "./MyPool";
import JoinedPool from "./JoinedPool";
import "./poolhome.css";
import PoolForm from "./PoolForm";

function PoolHome() {
  const navigate = useNavigate();
  
  const loggedinUser = parseInt(localStorage.getItem("logged"));
  
  if(!loggedinUser) {
    navigate('/signup');
  }
  const [section, setSection] = useState("1");
  const [allPool, setallPool] = useState([]);



  console.log(section);
  useEffect(() => {
    fetch("http://localhost:8081/allpool")
      .then((response) => response.json())
      .then((data) => setallPool(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="poolhomediv">
        <div className="outerbuttondiv">
      <button className="buttondiv"
        onClick={() => {
          setSection("1");
        }}
      >
        Available Pools
      </button>
      <button className="buttondiv"
        onClick={() => {
          setSection("2");
        }}
      >
        My Pools
      </button>
      <button className="buttondiv"
        onClick={() => {
          setSection("3");
        }}
      >
        Joined Pools
      </button>
      <button className="buttondiv"
        onClick={() => {
          setSection("4");
        }}
      >
        Create Pool
      </button>
      <button className="buttondiv"
            onClick={() => {
        localStorage.setItem("logged",null)
              
              navigate("/signup");

            }}
          >
            LOGOUT
          </button>

      </div>
    

    
        <div>
          {(() => {
            switch (section) {
              case "1":
                return (
                  <>
                    {allPool.length > 0 ? <AllPool allPool={allPool} /> : null}
                  </>
                );

              case "2":
                return (
                  <>
                    {allPool.length > 0 ? <MyPool allPool={allPool} /> : null}
                  </>
                );

              case "3":
                return (
                  <>
                    {allPool.length > 0 ? <JoinedPool allPool={allPool} /> : null}
                  </>
                );
                case "4":
                return (
                  <>
                    <PoolForm />
                  </>
                );
              default:
                return (
                  <>
                    {allPool.length > 0 ? <AllPool allPool={allPool} /> : null}
                  </>
                );
            }
          })()}
        </div>

        <div>
          
        </div>
      </div>
    </>
  );
}

export default PoolHome;
