import axios from "axios";
import React, { useEffect, useState } from "react";
import "./aboutpool.css";
import car1 from "./assets/images/car20.png";
import car2 from "./assets/images/car23.png";
import car3 from "./assets/images/bike5.png";
import car4 from "./assets/images/car24.png";
import car5 from "./assets/images/bike3.png";
import car11 from "./assets/images/car14.jpg";
import online from "./assets/images/online.png";

import { AiOutlineArrowRight } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllPool({ allPool }) {

  

  const loggedinUser = parseInt(localStorage.getItem("logged"));
  const [selectedRow, setSelectedRow] = useState(null);
  const images = [car1, car2, car3, car4, car5];
  const [search, setSearch] = useState(null);
  const [searchPool, setSearchPool] = useState({
    searchfrom: "",
    searchto: "",
    searchdate: "",
  });
  const [checkedIn, setCheckedIn] = useState(false);
  const [confirmCheckin, setConfirmCheckin] = useState(false);
  const [searcharray, setSearchArray] = useState([]);
  const [values, setValues] = useState({
    poolid: 0,
    loginid: loggedinUser,
  });

  const handleClick = (row) => {
    setSelectedRow(row);
  };

  const searchInput = () => {
    if (
      searchPool.searchfrom[0] != undefined &&
      searchPool.searchto[0] === undefined &&
      searchPool.searchdate[0] === undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolFrom.toLowerCase() === searchPool.searchfrom[0].toLowerCase()
      );
      setSearchArray(filteredPools);
    } else if (
      searchPool.searchfrom[0] === undefined &&
      searchPool.searchto[0] != undefined &&
      searchPool.searchdate[0] === undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolTo.toLowerCase() === searchPool.searchto[0].toLowerCase()
      );
      setSearchArray(filteredPools);
    } else if (
      searchPool.searchfrom[0] === undefined &&
      searchPool.searchto[0] === undefined &&
      searchPool.searchdate[0] != undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) => pool.poolDate === searchPool.searchdate[0]
      );
      setSearchArray(filteredPools);
    } else if (
      searchPool.searchfrom[0] != undefined &&
      searchPool.searchto[0] != undefined &&
      searchPool.searchdate[0] === undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolFrom.toLowerCase() ===
            searchPool.searchfrom[0].toLowerCase() &&
          pool.poolTo.toLowerCase() === searchPool.searchto[0].toLowerCase()
      );
      setSearchArray(filteredPools);
    } else if (
      searchPool.searchfrom[0] != undefined &&
      searchPool.searchto[0] === undefined &&
      searchPool.searchdate[0] != undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolFrom.toLowerCase() ===
            searchPool.searchfrom[0].toLowerCase() &&
          pool.poolDate === searchPool.searchdate[0]
      );
      setSearchArray(filteredPools);
    } else if (
      searchPool.searchfrom[0] === undefined &&
      searchPool.searchto[0] != undefined &&
      searchPool.searchdate[0] != undefined
    ) {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolTo.toLowerCase() === searchPool.searchto[0].toLowerCase() &&
          pool.poolDate === searchPool.searchdate[0]
      );
      setSearchArray(filteredPools);
    } else {
      const filteredPools = allPool.filter(
        (pool) =>
          pool.poolFrom.toLowerCase() ===
            searchPool.searchfrom[0].toLowerCase() &&
          pool.poolTo.toLowerCase() === searchPool.searchto[0].toLowerCase() &&
          pool.poolDate === searchPool.searchdate[0]
      );
      setSearchArray(filteredPools);
    }

    setSearch(true);
  };

  useEffect(() => {
    if (selectedRow != null) {
      setValues({ poolid: selectedRow.poolId, loginid: loggedinUser });
    }
  }, [selectedRow]);

  useEffect(() => {
    console.log(checkedIn)
    // setConfirmCheckin(false)
    if (checkedIn === false && confirmCheckin === true) {
      axios
        .post("http://localhost:8081/checkin", values)
        .then((res) => {
          console.log(res);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error.response.data);
          // toast.error(error.response.data.error, {
          //   position: "top-center",
          // });
        });
    } else if(checkedIn === true && confirmCheckin === true){
      toast.error("Already checked in To another pool", {
            position: "top-center",
          });
      console.log("errroe")
    }
  }, [confirmCheckin]);

  const handleCheckIn = () => {
    const checkedPools = allPool.filter(
      (pool) =>
        pool.members.includes(loggedinUser) === true &&
        selectedRow.poolDate === pool.poolDate &&
        selectedRow.poolTime === pool.poolTime &&
        setCheckedIn(true)
    );

    setConfirmCheckin(true);
    
    // setCheckedIn(checkedPools);
    // if(checkedIn.length === 0){
    //   axios
    //   .post("http://localhost:8081/checkin", values)
    //   .then((res) => {
    //     console.log(res);
    //     // window.location.reload(true);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //     // toast.error(error.response.data.error, {
    //     //   position: "top-center",
    //     // });
    //   });
    // }else{
    //   // toast.error("You are already in a pool at that time", {
    //   //     position: "top-center",
    //   //   });
    //   console.log("error alraeady in pool")
    // }
  };

  const handleSearch = (event) => {
    setSearchPool((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  return (
    <>
      <div className="allpooldiv">
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2%",
          }}
        >
          <div class="form-group mx-sm-3 mb-2" style={{ width: "20%" }}>
            <input
              type="text"
              class="form-control"
              placeholder="Search From"
              name="searchfrom"
              onChange={handleSearch}
            />
          </div>
          <div class="form-group mx-sm-3 mb-2" style={{ width: "20%" }}>
            <input
              type="text"
              class="form-control"
              placeholder="Search To"
              name="searchto"
              onChange={handleSearch}
            />
          </div>
          <div class="form-group mx-sm-3 mb-2" style={{ width: "20%" }}>
            <input
              type="date"
              class="form-control"
              placeholder="Search Date"
              name="searchdate"
              onChange={handleSearch}
            />
          </div>
          <button
            class="btn btn-primary"
            style={{ marginBottom: "0.5%", marginLeft: "3%" }}
            onClick={searchInput}
          >
            Search
          </button>
          {search ? (
            <button
              class="btn btn-danger"
              style={{ marginBottom: "0.5%", marginLeft: "3%" }}
              onClick={() => {
                setSearch(null);
                window.location.reload(true);
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
        {/* <div>These are available pools</div><br /><br /><br /><br /><br /> */}
        {search === null ? (
          <div className="mainpool">
            {allPool.map((item, index) => (
              <div
                className="poolintro"
                key={item.id}
                onClick={() => handleClick(item)}
              >
                {/* <div className="toppara">{item.poolBy}'s Pool</div> */}

                {item.availableSeats > 2 ? (
                  <>
                  <div className="toppara2">{item.poolBy}'s Pool
                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>

                  
                ) : item.availableSeats === 0 ? (




                  <>
                  <div className="toppara">{item.poolBy}'s Pool

                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>

                ) : (

                  <>
                  <div className="toppara3">{item.poolBy}'s Pool


                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>


                  
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
        ) : (
          <div className="mainpool">
            {searcharray.map((item, index) => (
              <div
                className="poolintro"
                key={item.id}
                onClick={() => handleClick(item)}
              >
                {/* <div className="toppara">{item.poolBy}'s Pool</div> */}

                {item.availableSeats > 2 ? (
                  <>
                  <div className="toppara2">{item.poolBy}'s Pool
                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>

                  
                ) : item.availableSeats === 0 ? (




                  <>
                  <div className="toppara">{item.poolBy}'s Pool

                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>

                ) : (

                  <>
                  <div className="toppara3">{item.poolBy}'s Pool


                  {item.members.includes(loggedinUser)===true?
                  <img src={online} style={{height:"50%", width:"7%", float:"right", margin:"2.5%"}}/>
                  :null}
                  </div>
                  </>


                  
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
        )}
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
                      <b>
                        Pool From: <br />
                        {selectedRow.poolFrom}
                      </b>
                    </span>

                    <span>
                      <b>
                        Pool To: <br />
                        {selectedRow.poolTo}
                      </b>
                    </span>
                  </div>

                  <div className="poolvalues">
                    <b>
                      Pool Date:
                      <br />
                      {selectedRow.poolDate}
                    </b>

                    <b>
                      Pool Time:
                      <br /> {selectedRow.poolTime}{" "}
                    </b>
                  </div>

                  <div className="poolvalues">
                    <b>Pool Seats: {selectedRow.poolSeats} </b>

                    <b>Available Seats: {selectedRow.availableSeats}</b>
                  </div>
                  <div className="poolbutton">
                    {selectedRow.members.length > 0 &&
                    selectedRow.members.includes(loggedinUser) === true ? (
                      <button class="btn btn-success">
                        Already checked in{" "}
                      </button>
                    ) : selectedRow.availableSeats > 0 ? (
                      <button class="btn btn-primary" onClick={handleCheckIn}>
                        Please Check In{" "}
                      </button>
                    ) : (
                      <button class="btn btn-danger">
                        No Seats Available{" "}
                      </button>
                    )}
                    <button
                      class="btn btn-danger"
                      style={{ width: "20%" }}
                      onClick={() => setSelectedRow(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AllPool;
