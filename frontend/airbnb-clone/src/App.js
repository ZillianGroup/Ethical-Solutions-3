import React from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import SearchPage from './SearchPage';
import Strapi from './Strapi';
import Available from './Available';
import Destination from './Destination';
import Destinationdetails from './Destinationdetails';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";






function App() {
  return (

    // BEM
    <div className="app">
      <Router>
        <Header />
        
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          
          <Route path="/book-destination">
            <Strapi />
          </Route>

          <Route path="/available-destinations">
            <Available />
          </Route>
          
          
          <Route path="/destination/:id">
            <Destinationdetails />
          </Route>
          <Route path="/destination">
            <Destination />
          </Route>
          
  
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        
        <Footer />
      </ Router>
    </div>
  );
}

export default App;
