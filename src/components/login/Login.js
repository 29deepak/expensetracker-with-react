import React ,{useState} from 'react'
import './Login.css'
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [user,setUser] =useState({
        email:"",
        password:""
    })
    let history=useHistory();
    const [show,setShow] = useState(false)
    const Handlers =e=>{
        const {name,value} =e.target
        setUser({
            ...user,
            [name]:value
        })
    }
    const Show =()=>{
        setShow(!show)
    }
    const Login =()=>{
        console.log(user)
        axios.post("http://localhost:4000/user/login",user)
        .then((res)=>{
            console.log(res)
            if(res.status===200){
                localStorage.setItem("token",res.data.token)
                alert(res.data.message)
                history.push("/expense")
            }
        })
    }
  return (
    <div className='login'>
        {console.log(user)}
        <div>
            <label>Email:</label>
            <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={Handlers}></input>
        </div>
        <div>
            <label >password:</label>
            <input type={show ? "text":"password"} name="password" value={user.password} placeholder="Enter Password" onChange={Handlers}></input>
            <label onClick={Show}>{show ? <AiFillEye /> : <AiFillEyeInvisible />}</label>
        </div>
        
        <button onClick={Login}>Login</button>
         <h3>or</h3>
         <button onClick={()=>history.push("/")}>Signup</button>

    </div>
  )
}

export default Login