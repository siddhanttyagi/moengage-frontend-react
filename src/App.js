
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Filterresult from './Filterresult';
import Login from './Login';
function App() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [session,setsession]=useState('false');
    const [switching,setswitching]=useState('false')
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (username.trim() === '' || password.trim() === '') {
        setError('Username and password cannot be empty');
      } else {
        setError('');
        const response=await axios.post('/insert_user',{
          username: username,
          password: password
        });
        if(response.data==='User data inserted successfully.')
        {
          console.log("win");
          setsession("true");
        }
      }
    };
  
   
      return (
        <div>
          {session === "false" && switching==="false" && (
            <div className='flexing'>
            <div>
              <h2>New User, Register here</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className='texting'>Username:</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className='texting'
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className='texting'>Password:</label>
                  <input
                    type="password"
                    id="password"
                    className='texting'
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
              </div>
              <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}><p>already have account ? <u onClick={()=>setswitching("true")} style={{cursor:"pointer"}}>click here to login</u></p></div>
            </div>
          
          )}
          
          {session==="true" && <Filterresult setsession={setsession} username={username} />}
          
          {switching==="true" && <Login session={session} setsession={setsession} />}
        </div>
      );
      
}

export default App;
