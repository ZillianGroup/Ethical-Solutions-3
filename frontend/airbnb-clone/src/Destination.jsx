import React from 'react';
import { useState, useEffect } from "react"
import './Card.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchResult from "./SearchResult";
import './destination.css'



const endpoint = `http://localhost:1337/aibnb-clones`

export default function Destination() {
  const [destination, setDestination] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const fetchDestination = async () => {
    const res = await fetch(endpoint)
    const data = await res.json()
    setDestination(data)
  }

  useEffect(() => {
    fetchDestination()
  })

  const searchDestination = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredSearch = destination.filter((user) =>
        Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredSearch)
    } else {
      setFiltered(destination)
    }
  }

  



useEffect(() => {
  const { data } = axios.get('http://localhost:1337/aibnb-clones',
  {
    
  });

  console.log(data)   
  }, []);
  

  

  return (
    <div className="md:flex flex-col justify-center p-5 md:max-w-2xl md:mx-auto lg:max-w-5xl">
      
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Search..."
        autoComplete="on"
        className="shadow w-full py-2 px-6 rounded"  
        onChange={(e) => searchDestination(e.target.value)}
      />





      <section className="large-search">

        {searchInput && searchInput.length > 1 
          ? filtered && filtered.map(({ id,  Name, ratings, Description, End, Available, Location, Media, medium, pictures, Amount}) => (
            <Link >
                  <div  key={id}>
                    <SearchResult
                      img={`${`http://localhost:1337`}${Media.formats.thumbnail.url}`}
                      title={Name}
                      description={Description}
                      price={Amount}
                      star={ratings}
                    />
             
                  </div>
             </Link>
              
              
            ))
          : destination && destination.map(({ id, Name, Available, End, resources, options, option2, ratings, Amount, places, name, location, medium, guest, beds, bath, author, host, url, Description,  Media, pictures,  thumbnail, large, small}) => (
             <Link to={`/destination/${id}`}>
                  <div  key={id}>
                    <SearchResult
                      img={`${`http://localhost:1337`}${Media.formats.thumbnail.url}`}
                      title={Name}
                      description={Description}
                      price={Amount}
                      star={ratings}
                    />
             
                  </div>
             </Link>
             
             ))}
      </section>

      

          
       
      

    </div>
  )
}