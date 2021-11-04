import React, { useState } from "react";
import "./Strapi.css";
import Axios from 'axios';




function Strapi() {
  const url = "http://localhost:1337/bookings-data"
  const [data, setData] = useState({
    Title:"",
    Checkin:"",
    Checkout:""
  })


  function submit(e){
    e.preventDefault();
    Axios.post(url,{
      Title: data.Title,
      Checkin: data.Checkin,
      Checkout: data.Checkout

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
    <div className="App">
      <h1>Posting form to backend</h1>
      <form onSubmit={(e)=> submit(e)}>
        <input  onChange={(e)=>handle(e)} id="Title" value={data.Title} type="text" placeholder="title" 
        className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
        <input  onChange={(e)=>handle(e)} id="Checkin" value={data.Checkin} type="date" placeholder="check-in date" 
        className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
        <input onChange={(e)=>handle(e)} id="Checkout" value={data.Checkout} type="date" placeholder="check-out date"  
        className="shadow  border-2 border-gray-400 py-2 px-6 rounded mt-7 ml-5"/>
        <button>Book Destination</button>
      </form>
    </div>
  );
}



export default Strapi
