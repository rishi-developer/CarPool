import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PoolForm() {
  const loggedinUser = parseInt(localStorage.getItem("logged"));

    const [values, setValues] = useState({
        name: "",
        start: "",
        end: "",
        date:"",
        time:"",
        seats:"",
        poolById:loggedinUser
        
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
        console.log(values);
        event.preventDefault();
        axios
          .post("http://localhost:8081/poolform", values)
          .then((res) => {
            window.location.reload(true)

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
   <>
    <div className='formdiv' style={{marginLeft:"10%"}}>
    <form action="" onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Pool By</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name" name="name" onChange={handleInput} style={{width:"40%", marginBottom:"1.5%"}}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Pool From</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Pool start location" name="start" onChange={handleInput} style={{width:"40%", marginBottom:"1.5%"}} />
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Pool To</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter pool end location" name="end" onChange={handleInput} style={{width:"40%", marginBottom:"1.5%"}} />
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Pool Date</label>
    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="Enter Pool Date" name="date" onChange={handleInput}  style={{width:"40%", marginBottom:"1.5%"}}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Pool Time</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Pool Time" name="time" onChange={handleInput} style={{width:"40%", marginBottom:"1.5%"}} />
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Pool Total Seats</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter the total seats available" name="seats" onChange={handleInput} style={{width:"40%", marginBottom:"1.5%"}} />
  </div>
  
  <button class="btn btn-primary">Create Pool</button>

</form>
    </div>
      <ToastContainer />

   </>
  )
}

export default PoolForm