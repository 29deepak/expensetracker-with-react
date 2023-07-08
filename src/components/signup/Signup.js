import React , {useState} from 'react'
import './Signup.css'
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Signup = () => {
    const [user,setUser] =useState({
        name:"",
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
    const Register =()=>{
        axios.post("http://localhost:4000/user/signup",user)
        .then((res)=>{
            console.log(res)
            if(res.status===201){
                alert(res.data.message)
                history.push("/login")
            }

        })
    }
  return (
    <div className='user-sign'>
        {console.log(user)}
        <div>
            <label>Name:</label>
            <input type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={Handlers}></input>
        </div>
        <div>
            <label>Email:</label>
            <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={Handlers}></input>
        </div>
        <div>
            <label >password:</label>
            <input type={show ? "text":"password"} name="password" value={user.password} placeholder="Enter Password" onChange={Handlers}></input>
            <label onClick={Show}>{show ? <AiFillEye /> : <AiFillEyeInvisible />}</label>
        </div>
        <button onClick={Register}>SignUp</button>
         <h3>or</h3>
         <button onClick={()=>{
            history.push("/login")
         }}>Login</button>

    </div>
  )
}

export default Signup