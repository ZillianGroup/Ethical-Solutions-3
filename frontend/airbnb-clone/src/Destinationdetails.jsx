import React, { useState, useEffect } from "react";
import { useParams } from 'react-router'
import useFetch from './useFetch'
import './Destinationdetails.css'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import  format from "date-fns/format";
import  parse from "date-fns/parse";
import  startOfWeek from "date-fns/startOfWeek";
import  getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Carousel, { CarouselItem } from "./Carousel";



const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  
})

const events =[
    {
      title: "",
      allday: true,
      start: new Date(2021,6,0),
      end: new Date(2021,6,0),
      
    }
  
  
  
]
  


export default function Destinationdetails() {
    const url = "http://localhost:1337/reviews" 
    const [front, setFront] = useState()
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events)
    const [show, setShow] = useState(false)
    const [number1, setNumber1] = useState()
    const [number2, setNumber2] = useState()
    const [total, setTotal] = useState(number1 * number2)
   
    function addThemTogether(){
        setTotal(number1 * number2)

    }
    const [review, setReview] = useState({
        name:"",
        reviews:""
    })
    useEffect(()=>{
        Axios.get(`http://localhost:1337/reviews`).then((res)=>{
            const responseFront = res.data;
            setFront(responseFront);
        })
        .catch(err=> {
            console.log(err)

        })
    }, []);

    

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            name:review.name,
            reviews:review.reviews
        });
        
    }

    function handle(e){
        const newdata={...review}
        newdata[e.target.id]=e.target.value
        setReview(newdata)
        console.log(newdata)
    }
  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

    const { id} = useParams();
    const { loading, error, data} = useFetch('http://localhost:1337/aibnb-clones/' + id)
    
   if(loading) return <p>loading...</p>
   if(error) return <p>Error...</p>
   console.log(data)
    return (

        <div className="App">
           
           <div className='content'>
               <div className="heading">
                    <h1 className="font-bold text-2xl">{ data.Name}</h1>
                    <div className="bottom-section">
                        <div className="location"><a href="https://black-history-month-api.hopless">{ data.Location}</a></div>
                        
                    </div>
               </div>
               <div className="images">
                {data.Media.formats.large.url.includes(data.Media.formats.large.url) ? (
                     <div className="left">

                     <img src={`${`http://localhost:1337`}${data.Media.formats.large.url}`} alt="destination-pics"/> 
                   </div>

                ):(
                    <h1>Image format not available</h1>
                )}
                  
                   <div className="right">
                       <div className="top">
                         <img src={`${`http://localhost:1337`}${data.pictures[0].formats.thumbnail.url}`} alt="destination-pics"/>
                         <img src={`${`http://localhost:1337`}${data.pictures[1].formats.thumbnail.url}`} alt="destination-pics"/>

                       </div>
                       <div className="bottom">
                       <img src={`${`http://localhost:1337`}${data.pictures[2].formats.thumbnail.url}`} alt="destination-pics"/>
                        <img src={`${`http://localhost:1337`}${data.pictures[3].formats.thumbnail.url}`} alt="destination-pics"/>

                       </div>
                   </div>
               </div>

               <div className="mobile-carousel">
               <Carousel>
                        <CarouselItem> <img src={`${`http://localhost:1337`}${data.Media.formats.thumbnail.url}`} alt="destination-pics"/> </CarouselItem>
                        <CarouselItem><img src={`${`http://localhost:1337`}${data.pictures[0].formats.thumbnail.url}`} alt="destination-pics"/></CarouselItem>
                        <CarouselItem><img src={`${`http://localhost:1337`}${data.pictures[1].formats.thumbnail.url}`} alt="destination-pics"/></CarouselItem>
                        <CarouselItem><img src={`${`http://localhost:1337`}${data.pictures[2].formats.thumbnail.url}`} alt="destination-pics"/></CarouselItem>
                        <CarouselItem><img src={`${`http://localhost:1337`}${data.pictures[3].formats.thumbnail.url}`} alt="destination-pics"/></CarouselItem>
                </Carousel>
                            
               </div>
              
             
                <div className="middle-section">
                <div className="upper">

                    <div className="heading">
                        <h1>Island hosted by { data.author}</h1>
                    </div>
                    <div className="img">
                        <img src={`${`http://localhost:1337`}${data.host.formats.thumbnail.url}`} alt="destination-pics"/>
                    </div>
                </div>
                
                    <div className="left">
                        
                        <div className="top">
                            <div className="features">
                                <div className="guest">
                                    <li>{ data.guest}</li>
                                    <p>guests</p>
                                </div>
                                
                                <div className="beds">
                                    <li>{ data.beds}</li>
                                    <p>beds</p>
                                </div>

                                <div className="baths">
                                    <li>{ data.baths}</li>
                                    <p>baths</p>
                                </div>
                                
                            </div>
                        </div>

                        
                    </div>
                    <hr className="line-up"></hr>
                        <div className="left-bottom">
                            <div className="basics">
                                    <div className="amenities">
                                        <div className="logo">
                                            <i class="fas fa-home"></i>

                                        </div>
                                        <div className="description">
                                            <div className="heading">
                                                <h2>Entire Home</h2>
                                            </div>
                                            <div className="details">
                                                <p>You will have this place all to your self</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>


                            <div className="basics2">
                                    <div className="amenities">
                                        <div className="logo">
                                            <i class="fas fa-home"></i>

                                        </div>
                                        <div className="description">
                                            <div className="heading">
                                                <h2>Enhanced clean</h2>
                                            </div>
                                            <div className="details">
                                                <p>The host has committed to Ethical-Solution's 5-step enhanced cleaning process</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>


                            <div className="basics3">
                                    <div className="amenities">
                                        <div className="logo">
                                            <i class="fas fa-home"></i>

                                        </div>
                                        <div className="description">
                                            <div className="heading">
                                                <h2>Pool</h2>
                                            </div>
                                            <div className="details">
                                                <p>Guests usually search for this popular amenity</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                        </div>


                        

                    
                    

                   
                    <div className="right">
                        <div className="amount">
                            <p className="tag">${data.Amount}</p>
                            <p className="duration">/night</p>
                        </div>
                        <div className="checks">
                            <div className="check-in" >
                                <h6> CHECK IN</h6>
                                <input type="date"  placeholder="add date"/>
                               
                            </div>
                            <div className="check-out">
                            <h6> CHECKOUT</h6>
                            <input type="date"  placeholder="add date"/>
                            </div>
                        
                        </div>
                        <div className="guests">
                            <div className="guest-number">
                                <h6>GUESTS</h6>
                                <input type="number"  placeholder="Number of guests" value={number1} onChange={e =>setNumber1(+e.target.value)}/>
                                
                            </div>
                            <div className="dropdown">
                                <i class="fas fa-angle-down"></i>

                            </div>
                        </div>
                        <div className="total">
                            <input type="number"  placeholder=" Destination amount" value={number2} onChange={e =>setNumber2(+e.target.value)}/>
                            <div className="get-total">
                            <button onClick={addThemTogether}>Get Total</button>
                            <h2>${total}</h2>
                            </div>

                        </div>
                        

                        <div className="check-availability">
                            <Link to={'/book-destination'}>
                                <button ><p>BOOK DESTINATION</p></button>

                            </Link>

                            
                            
                        </div>
                        
                        
                    </div>
                    <hr className="line-up"></hr>
                    

                    <div className="destination-details">
                
                        <div className="details">
                            <p>{data.Description}</p>

                        </div>
                    </div>

                    <hr className="line"></hr>

                    <div className="offer">
                    {data.resources.length > 3 ? (
                        <div className="packages">
                        <div className="heading">
                            <h1>What this place offers</h1>

                        </div>
                        
                        <div className="kitchen">
                            <i class="fas fa-home"></i>
                            <p>{data.resources[0].options}</p>
                            

                        </div>

                        <div className="kitchen">
                         <i class="fas fa-home"></i>
                         <p>{data.resources[0].option2}</p>
                         

                        </div>

                        <div className="kitchen">
                         <i class="fas fa-home"></i>
                         <p>{data.resources[1].options}</p>

                        </div>

                        <div className="kitchen">
                         <i class="fas fa-home"></i>
                         <p>{data.resources[1].option2}</p>

                        </div>

                        
                    </div>

                    ) :(<h1>Amenities are not available at this moment...</h1>)}
                    {data.resources.length > 3 ?(
                        <div className="offer-right">
                        {
                                show?<div>
    
                                <div className="kitchen">
                                    <i class="fas fa-home"></i>
                                    <p>{data.resources[2].options}</p>
    
                                </div>
    
                                <div className="kitchen">
                                    <i class="fas fa-home"></i>
                                    <p>{data.resources[2].option2}</p>
    
                                </div>
    
                                <div className="kitchen">
                                    <i class="fas fa-home"></i>
                                    <p>{data.resources[3].options}</p>
    
                                </div>
    
                                <div className="kitchen">
                                    <i class="fas fa-home"></i>
                                    <p>{data.resources[3].option2}</p>
    
                                </div>
    
                                
                                
                            
                            </div>:null
                            }
    
    
                        </div>
                    ):(<h1>Amenities are not available at this moment...</h1>)}
                    

                        
                        
                        
                    </div>-
                    
                    <div className="offer-button">
                        
                        <button onClick={()=>setShow(!show)}><p>Show all amenities</p></button>
                        
                    </div>
                
                    <hr className="line"></hr>

                    

                </div>
                <hr className="line"></hr>

                <div className="date-picker">
                    
                    <input type="text"  className="shadow w-60 md:ml-8 border-2 border-gray-400  py-2 px-6 rounded mt-7" placeholder="Add title" 
                    value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title:e.target.value})}
                    
                    />
 
                    <div  className="in">
                        <DatePicker  className="shadow  border-2  md:ml-8 border-gray-400 py-2 px-6 rounded mt-7 "placeholderText="Check-in" 
                        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
                        />

                    </div>
                    <div  >
                        <DatePicker  className="shadow border-2  md:ml-8  border-gray-400 py-2 px-6 rounded mt-7" placeholderText="Check-out"
                        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
                        />      

                    </div>
                   <div className="book-destination">
                        <button  onClick={handleAddEvent}>Add to Calendar</button>  
                   </div>
                    
                    
                </div>
            

                <div className="calendar">
                 <Calendar localizer={localizer} events={allEvents} 
                 startAccessor="start" endAccessor="end" style={{height:300, margin:"50px"}}/>
        

                </div>
                <Link to={`/book-destination`}>
                    <div className="proceed">
                        <button>Proceed to book destination</button>
                    </div>

                </Link>
                
                
                        

                <div className="related-data">
                   
                    { data.places.length > 0 ? (
                        <div className="places">
                        Related destinations:
                        <Link >
                         <h3>{ data.places[0].name}</h3>
                            
                        </Link>

                        </div>
                         
                        

                    ):(
                        <h2>No related destinations</h2>


                    )}

                        
                   

                   
                    
                </div>
                <div className="review">
                    <h1>How do you feel about Ethical Solutions?</h1>
                    <form onSubmit={(e) => submit(e)} className="flex flex-col">
                        <input  onChange={(e) => handle(e)} value={review.name} type="text" id="name" placeholder="name"/>
                        <textarea onChange={ (e) => handle(e)} value={review.reviews} id="reviews" cols="30" rows="10" placeholder="comment"></textarea>
                        <button>Post review</button>
                    </form>
                    <div className="front">
                    {
                        front.length > 0 && (
                            
                            <div>
                                {front.map ((each)=>(
                                    
                                    
                                     <div className="feedback">
                                    
                                     <div className="id" key={each.id}>
                                         <h3>{each.id}</h3>
                                     </div>
                                     <div className="content">
                                     <h3>{each.reviews}</h3>
                                     <p>by {each.name}</p>
 
                                     </div>
                                     
                                    
                                 
 
                                    </div>

                                ))}
                                
                                
                            </div>
                            

                            
                        )
                    }
                    
                </div>
                    <div className="see-reviews"> 
                        < Link to={`/reviews/${id}`} style={{textDecoration:'underline', color:'blue'}}>
                            <button>See all reviews</button>
                        </Link>

                     </div>
                       


                
                </div>

                


                

                

                
                        

                
              
            
              
              </div>

        </div>
    )
}


