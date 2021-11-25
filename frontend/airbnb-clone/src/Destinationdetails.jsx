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
import { DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';
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




export default function Destinationdetails() {
    
    const events =[
        {
          title: "Available",
          allday: true,
          start: new Date(2021,11,1),
          end: new Date(2021,11,12),
          
        }
      
      
      
    ]

   

   
    
    const url = "http://localhost:1337/reviews" 
    const [front, setFront] = useState()
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events)
    const [show, setShow] = useState(false)
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [count1, setCount1] =  useState(0)
    const [count2, setCount2] =  useState(0)
    const [count3, setCount3] =  useState(0)
     
    const toggleModal2 = () =>{
        setModal2(!modal2)
    }

    const toggleModal = () =>{
        setModal(!modal)
    }
    const handleIncrement1 = () =>{
        setCount1(count1 + 1)
    }
    const handleDecrement1 = () =>{
        setCount1(count1 - 1)
    }
    const handleIncrement2 = () =>{
        setCount2(count2 + 1)
    }
    const handleDecrement2 = () =>{
        setCount2(count2 - 1)
    }
    const handleIncrement3 = () =>{
        setCount3(count3 + 1)
    }
    const handleDecrement3 = () =>{
        setCount3(count3 - 1)
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

   const eventee =[
    {
        title: "Available",
        start: data.available,
        end: data.End,
        
    }
   ]
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
                  {data.pictures.length  === 4 ? (
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
                  ):(<h1>Images are unavailable, kindly uoload images</h1>)}
                  
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
                            <p className="tag">${data.Amount} </p>
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
                            
                                
                                
                            </div>
                            <div className="dropdown">
                                <input   placeholder="Number of guests" value={count1 + count2 + count3} />
                                <i class="fas fa-angle-down" onClick={toggleModal}></i>
                                {show ? <div className="modals">
                        <button onClick={toggleModal}></button>
                        {modal && (
                            <div className="modal">
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                    <button onClick={toggleModal} className="close"><i class="fa fa-window-close"></i></button>
                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Adults</h1>
                                                <p>Age 13+</p>
                                            </div>
                                            <div className="number">
                                                <button  onClick={handleIncrement1}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count1}</p>
                                                <button onClick={handleDecrement1} className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Children</h1>
                                                <p>Ages 2-12</p>
                                            </div>
                                            <div className="number1">
                                                <button onClick={handleIncrement2}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count2}</p>
                                                <button onClick={handleDecrement2}className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Infants</h1>
                                                <p>Under 2</p>
                                            </div>
                                            <div className="number2">
                                                <button onClick={handleIncrement3}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count3}</p>
                                                <button onClick={handleDecrement3}className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Pets</h1>
                                                <p>Bringing an assistance animal?</p>
                                            </div>
                                            <div className="number3">
                                                <button className="plus"><i class="fa fa-plus"></i></button>
                                                <p>0</p>
                                                <button className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    

                                </div>

                            </div>

                         )}
                    </div>
                    :null}
                                <div className="show"></div>

                            </div>
                            
                        </div>
                       
                        <div className="total">
                            <input  value={data.Amount}/>
                            <div className="get-total">
                            <button>Get Total</button>
                            <h2>${data.Amount * (count1 + count2 + count3) }</h2>
                            </div>

                        </div>
                        

                        <div className="check-availability">
                                <button  onClick={toggleModal2}><p>CHECK AVAILABILITY</p></button>
                            
                            
                            
                        </div>
                        
                        
                    </div>
                    <hr className="line-up"></hr>
                    <div className="modals">
                        <button onClick={toggleModal}></button>
                        {modal && (
                            <div className="modal">
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                    <button onClick={toggleModal} className="close"><i class="fa fa-window-close"></i></button>
                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Adults</h1>
                                                <p>Age 13+</p>
                                            </div>
                                            <div className="number">
                                                <button  onClick={handleIncrement1}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count1}</p>
                                                <button onClick={handleDecrement1} className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Children</h1>
                                                <p>Ages 2-12</p>
                                            </div>
                                            <div className="number1">
                                                <button onClick={handleIncrement2}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count2}</p>
                                                <button onClick={handleDecrement2}className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Infants</h1>
                                                <p>Under 2</p>
                                            </div>
                                            <div className="number2">
                                                <button onClick={handleIncrement3}className="plus"><i class="fa fa-plus"></i></button>
                                                <p>{count3}</p>
                                                <button onClick={handleDecrement3}className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>

                                        <div className="adults">
                                            <div className="tag">
                                                <h1>Pets</h1>
                                                <p>Bringing an assistance animal?</p>
                                            </div>
                                            <div className="number3">
                                                <button className="plus"><i class="fa fa-plus"></i></button>
                                                <p>0</p>
                                                <button className="minus"><i class="fa fa-minus"></i></button>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    

                                </div>

                            </div>

                         )}
                    </div>

                    {modal2 ? (
                                <div className="total-modal">
                                    <div className="top">
                                        <button>Reserve</button>
                                        <p>You won't be charged yet.</p>

                                    </div>
                                    
                                    <div className="calculations">
                                        <div className="amount1">
                                            <div className="am1">
                                                <p>${data.Amount  } X 2 nights</p>

                                            </div>
                                            <div className="am2">
                                                    <p>Cleaning fees</p>
                                                    <h6>${data.Fee1}</h6>
                                            </div>
                                            <div className="am3">
                                                    <p>Service fees</p>
                                                    <h6>${data.Fee2}</h6>
                                            </div>
                                            <hr />

                                            <div className="final">
                                                    <p>Total</p>
                                                    <h6>${(data.Amount * (count1 + count2 + count3)) + (data.Fee2 + data.Fee1)}</h6>
                                            </div>

                                           
                                            
                                           
                                        

                                    


                                    </div>
                                    <button onClick={toggleModal2} className="close"><i class="fa fa-window-close"></i></button>
                                </div>


                            </div>
                            ) : null}
                            

                    

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
                        
                    </div>
                    
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
                    {(newEvent.start) - (newEvent.end)/(1000 * 60 * 60 * 24)}

                     
                   <div className="book-destination">
                        <button  onClick={handleAddEvent}>Add to Calendar</button>  
                   </div>
                    
                    
                </div>
            

                <div className="calendar">
                 <Calendar localizer={localizer} events={eventee} 
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
                        <h2>No related destinations(yet)</h2>


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
                                     <h3>"{each.reviews}"</h3>
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
                       <DateRangePickerComponent placeholder="Enter check in date" startDate={data.Available} endDate={data.End}></DateRangePickerComponent>


                
                </div>

                


                

                

                
                        

                
              
            
              
              </div>

        </div>
    )
}


