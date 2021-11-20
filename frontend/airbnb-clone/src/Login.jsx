import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


function Login() {
    axios.get('http://localhost:1337/connect/auth0').then(response => {
  console.log(response);
});
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();

    return (
        <>
        {!isLoading && !user && (
            <button onClick={()=> loginWithRedirect()}>
            Login
           
            </button>
        )}
        {!isLoading && user && (
            <button onClick={()=> logout()}>
            Logout
           
            </button>
        )}
        
        </>
    )
}

export default Login



