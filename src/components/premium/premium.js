import React ,{useState} from 'react'
import axios from 'axios';
const Premium = () => {
    const [data,setData] =useState([])
    const leader= async()=>{
        console.log("leaderboard")
        const token=localStorage.getItem('token')
        const userLeaderBoardArray=await axios.get(`http://localhost:4000/premium/showLeaderBoard`,{headers:{"Authorization":token}})
        setData(userLeaderBoardArray.data)
    }

  return (
    <>
      <button onClick={leader}>Show LeaderBoard</button>
      {console.log("leader",data)}
      <ul>
        {
            data.map((each)=>{
                return (
                    <li>Name:{each.name} Amount:{each.total_cost || 0}</li>
                )
            })
        }
      </ul>
      </> 
   
  )
}

export default Premium