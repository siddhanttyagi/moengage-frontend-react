
import './App.css';
import { useState } from 'react';
import axios from 'axios';
function App() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
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
        console.log(response.data);
      }
    };
  
    return (
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
    );
}

export default App;
