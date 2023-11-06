import React, { useEffect, useState } from "react";
import axios from "axios";
const Review = (props) => {
  const [content, setcontent] = useState("");
  const [rating, setrating] = useState("");
  const [cnt,setcnt]=useState(0);
  const [allreviews,setallreviews]=useState([]);
  

async function findallreviews(){
    const reviewdata = await axios.get('/allreviews',{
        params: {
            brewery_name: props.currentname
        }
    })
        
    console.log(reviewdata.data);
    setallreviews(reviewdata.data);
}
  useEffect(()=>{
    findallreviews();
  },[cnt])



  async function handleSubmitbutton(e) {
    e.preventDefault();
    const response=await axios.post('/newreview',{
        rating: rating,
        content: content,
        brewery_name: props.currentname,
        username: props.username
    })
    setcnt((prev)=> prev+1)
    console.log(response.data);

  }
  return (
    <div>
      <h3 className="heading-changer">{props.currentname}</h3>
      <form onSubmit={handleSubmitbutton}>
        <div>
          <textarea
            placeholder="Enter the content"
            className="texting"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="texting">ADD Rating⭐</label>
          <select value={rating} onChange={(e) => setrating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary extra">Submit</button>
        
      </form>
      <ul>
        {allreviews.map((item, index) => (
          <div style={{border:"solid grey"}}>
            <li key={index} style={{color:"green"}}>{item.username}</li>
            <li key={index}>{item.content}</li>
            <li key={index}>{item.rating}⭐</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Review;
