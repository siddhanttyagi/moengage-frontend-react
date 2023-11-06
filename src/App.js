
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Filterresult from './Filterresult';
function App() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [session,setsession]=useState('false');
  
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
          {session === "false" && (
            <div>
              <h2>Register Form</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
            </div>
          )}
          {session==="true" && <Filterresult setsession={setsession} username={username} />}
          {session==="true" && (<div>hello</div>)}
        </div>
      );
      
}

export default App;
