import axios from "axios";
import React, { useEffect, useState } from "react";
import "./aboutpool.css";
import car1 from "./assets/images/car20.png";
import car2 from "./assets/images/car23.png";
import car3 from "./assets/images/bike5.png";
import car4 from "./assets/images/car24.png";
import car5 from "./assets/images/bike3.png";
import car11 from "./assets/images/car14.jpg";

import { AiOutlineArrowRight } from "react-icons/ai";

function AllPool({ allPool }) {
  const loggedinUser = parseInt(localStorage.getItem("logged"));
  const [selectedRow, setSelectedRow] = useState(null);
  const images = [car1, car2, car3, car4, car5];
  const [myPools, setMyPools] = useState([]);

  const [values, setValues] = useState({
    poolid: 0,
    loginid: loggedinUser,
  });

  const handleClick = (row) => {
    setSelectedRow(row);
  };
  console.log(allPool);
  useEffect(() => {
    if (selectedRow != null) {
      setValues({ poolid: selectedRow.poolId, loginid: loggedinUser });
      console.log(values);
    }
  }, [selectedRow]);

  useEffect(() => {
    const filteredPools = allPool.filter(
      (pool) => pool.members.includes(loggedinUser) === true
    );
    setMyPools(filteredPools);
  }, []);

  const handleCheckIn = () => {
    axios
      .post("http://localhost:8081/checkin", values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
        // toast.error(error.response.data.error, {
        //   position: "top-center",
        // });
      });
  };
  const handleLeave=()=>{
    axios
      .post("http://localhost:8081/leavepool", values)
      .then((res) => {
        console.log(res);
        window.location.reload(true)

      })
      .catch((error) => {
        console.log(error.response.data);
        // toast.error(error.response.data.error, {
        //   position: "top-center",
        // });
      });
  };

  return (
    <>
      <div className="allpooldiv">
        {/* <div>These are available pools</div><br /><br /><br /><br /><br /> */}
        <div className="mainpool">
          {myPools.map((item, index) => (
            <div
              className="poolintro"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              {/* <div className="toppara">{item.poolBy}'s Pool</div> */}
              {item.availableSeats > 2 ? 
                <div className="toppara2">{item.poolBy}'s Pool</div>:(
                item.availableSeats === 0 ? 
                <div className="toppara">{item.poolBy}'s Pool</div>:
                <div className="toppara3">{item.poolBy}'s Pool</div>
              )}
              <img src={images[index % 5]} style={{ height: "60%" }} />
              <div className="outerpara">
                <b>
                  {" "}
                  {item.poolFrom} <AiOutlineArrowRight /> {item.poolTo}
                </b>
              </div>
            </div>
          ))}
        </div>
        <div className="selecteddiv">
          {selectedRow && (
            <div className="modal-background">
              <div className="modal-container">
                <div className="poolimg">
                  <img src={car11} className="leftimg" />
                </div>
                <div className="pooldetails">
                  {/* <div className="poolvalues">
                    <b>Pool Created By: </b>
                    {"\t"}
                    {selectedRow.poolBy}
                  </div> */}
                  <div className="poolvalues">
                    <span>
                      <b>Pool From:<br/> {selectedRow.poolFrom}</b>
                    </span>

                    <span>
                      <b>Pool To:<br/> {selectedRow.poolTo}</b>
                    </span>
                  </div>

                  <div className="poolvalues">
                    <b>Pool Date:<br/> {selectedRow.poolDate}</b>

                    <b>Pool Time:<br/> {selectedRow.poolTime} </b>
                  </div>

                  <div className="poolvalues">
                    <b>Pool Seats: {selectedRow.poolSeats} </b>

                    <b>Available Seats: {selectedRow.availableSeats}</b>
                  </div>
                  <div className="poolbutton">
                    {selectedRow.members.includes(loggedinUser) === true ? (
                      <button class="btn btn-success" style={{ width: "30%" }}>
                        Already checked in{" "}
                      </button>
                    ) : (
                      <button class="btn btn-success">
                        Already checked in{" "}
                      </button>
                    )}
                    <button
                      class="btn btn-danger"
                      style={{ width: "20%" }}
                      onClick={() => setSelectedRow(null)}
                    >
                      Close
                    </button>
                    <button
                      class="btn btn-danger"
                      style={{ width: "20%" }}
                      onClick={handleLeave}
                    >
                      Leave Pool 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllPool;
