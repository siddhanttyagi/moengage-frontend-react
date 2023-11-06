import React, { useState } from 'react'
import axios from 'axios';
import Review from './Review';
const Filterresult = () => {

const [bycity,setbycity]=useState('');
const [bytype,setbytype]=useState('');
const [byname,setbyname]=useState('');
const [results,setresults]=useState([]);
const [resulttoggle,settoggle]=useState("true");
const [currentname,setcurrentname]=useState('');
 async function handleSubmitted(e){
    e.preventDefault();
    const response=await axios.post('/filterresult',{
        by_city: bycity,
        by_type: byname,
        by_name: byname
    });
    settoggle("true")
    console.log(response.data.data);
    setresults(response.data.data)
 }

 async function reviews(itemname){
    
    settoggle("false")
    console.log("mai review hoon");
    setcurrentname(itemname)

 }

  return (
    <div>
        
        <form onSubmit={handleSubmitted}>
          <div>
            <label>City:</label>
            <input
              type="text"
              placeholder="Enter the city"
              value={bycity}
              onChange={(e)=>setbycity(e.target.value)}
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              placeholder="Enter the Type"
              value={bytype}
              onChange={(e)=>setbytype(e.target.value)}
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter the Name"
              value={byname}
              onChange={(e)=>setbyname(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
          </form>

          <div>
      
      {resulttoggle==="true" &&
      <div>
        <h3>Response Data:</h3>
      <ul>
        {results.map((item, index) => (
          <div style={{border:"solid grey"}}>
            <li onClick={() =>reviews(item.name)} key={index} style={{color:"red", cursor:"pointer"}}>{item.name}</li>
            <li key={index}>{item.address_1}</li>
            <li key={index}>{item.phone}</li>
            <li key={index}>{item.website_url}</li>
            <li key={index}>{item.state_province}, {item.city}</li>
          </div>
        ))}
      </ul>
      </div>
}
{resulttoggle==="false" && 
    <Review currentname={currentname}/>
}
    </div>
    </div>
  )
}

export default Filterresult