import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';


function ProtectedRoutes({component: Component, ...rest}){
    // axios.get('http://localhost:1337/connect/auth0').then(response => {
    //     console.log(response);
    // });
    const { loginWithRedirect, isLoading, user, isAuthenticated } = useAuth0();

    return (
        <Route
            {...rest}
            render= {props=>{
               if(!isLoading && user) {
                console.log(isAuthenticated)
                return <Component {...props}/>
               }
               else if(!isLoading && !user){console.log(isAuthenticated)
                   return<Redirect to={
                       { pathname: '/',
                         state: {
                             from: props.location
                         }} 
                   }/>
               }
                
            }}
            >
        
        </Route>
    )
}

export default ProtectedRoutes
