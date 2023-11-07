import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success,setsuccess]=useState('');
    const [view,setview]=useState("true");
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/login', { username:username, password: password });
        // Handle the response from the server here
        console.log('Server response:', response.data);
        if(response.data==="failed")
        {
          setsuccess('wrong credential')
        }
        else
        {
          props.setsession("true");
          setview("false");
        }

      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
      {view==="true" &&
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} className='heading-changer'>
        <h1 className='tester'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='texting'>Username:</label>
            <input
              type="text"
              className='texting'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className='texting'>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
        <p>{success}</p>
      </div>
}
      </div>
    );
  }


export default Login