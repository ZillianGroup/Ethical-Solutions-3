import React, { useState } from "react";
import "./Strapi.css";
import Axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



toast.configure()

function Strapi() {
  const notify = () =>{
    toast('Booking Successful, proceed to home to explore more destinations')
  }
  const url = "http://localhost:1337/bookings-data"
  const [data, setData] = useState({
    Title:"",
    Checkin:"",
    Checkout:"",
    Guests:"",
    Name:""
  })


  function submit(e){
    e.preventDefault();
    Axios.post(url,{
      Title: data.Title,
      Checkin: data.Checkin,
      Checkout: data.Checkout,
      Guests: data.Guests,
      Name: data.Name

    })
    .then(res=>{
      console.log(res.data)
    })

  }

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)

  }
  return (
    <div className="Destination">

      <h1>Book Destination</h1>
      <div className="form">
        <form onSubmit={(e)=> submit(e)}>
          <div className="name">
            <label> Full name:</label>
            <input  onChange={(e)=>handle(e)} id="Name" value={data.Name} type="text"
            className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>

          </div>
          <div className="title">
            <label>Destination:</label>
            <input  onChange={(e)=>handle(e)} id="Title" value={data.Title} type="text" 
            className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
          </div>
          <div className="checkin">
            <label> Check-in:</label>
            <input  onChange={(e)=>handle(e)} id="Checkin" value={data.Checkin} type="date"  
            className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
          </div>
          <div className="checkout">
            <label>Check-out:</label>
            <input onChange={(e)=>handle(e)} id="Checkout" value={data.Checkout} type="date" 
             className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
          </div>
          <div className="guests">
            <label>No of Guests:</label>
            <input onChange={(e)=>handle(e)} id="Guests" value={data.Guests} type="number" 
             className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>

          </div>
          
      
            <button onClick={notify}>Book Destination</button>

           

          
        </form>

       


      </div>
      
    </div>
  );
}



export default Strapi
