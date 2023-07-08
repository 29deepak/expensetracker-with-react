import React,{useState} from 'react'
import './Expense.css'
import axios from 'axios'
import GetExpense from '../get-expeses/GetExpense';
import Razorpay from '../razorpay/razorpay';
import Premium from '../premium/premium'
const Expense = () => {
    const [expense,setExpense] = useState({
        expenseamount:"",
        description:"",
        category:""
    })
    const[ispremiumuser,setPremiumUser] =useState(false)
    const Handlers =(e)=>{
        const {name,value}=e.target
        {
            setExpense({
                ...expense,
                [name]:value
            })
        }
    }
    const AddExpense=()=>{
        const token=localStorage.getItem("token")
        axios.post("http://localhost:4000/expense/addexpense",expense,{headers:{"Authorization":token}})
        .then((res)=>{
            console.log(res)
            
        })
    }
    const payment =()=>{
        console.log("razorpay here")
    }
    // function parseJwt (token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    
    //     return JSON.parse(jsonPayload);
    // }
    // function premiumUser(){
    //     const token=localStorage.getItem("token")
    //     const decodeToken=parseJwt(token)
    //     console.log(decodeToken)
    //     const ispremiumuser=decodeToken.ispremiumuser
    //     console.log("ispremiumuser",ispremiumuser)
    //     if(ispremiumuser){
    //         setPremiumUser(ispremiumuser)
    //     }

    // }
    
  return (
    <>
    <div className='user-sign'>
        {console.log(expense)}
        <div>
            <label>Expenseamount:</label>
            <input type="number" name="expenseamount" value={expense.expenseamount} placeholder="Enter Amount" onChange={Handlers} ></input>
        </div>
        <div>
            <label>Description:</label>
            <input type="text" name="description" value={expense.description} placeholder="Enter Description" onChange={Handlers}></input>
        </div>
        <div>
            <label >Category:</label>
            <select id="category" name="category" value={expense.category} onChange={Handlers}>
            <option value="fuel">FUEL</option>
            <option value="food">FOOD</option>
            <option value="electricity">ELECTRICITY</option>
            <option value="shooping">SHOOPING</option>
            <option value="gym">GYM</option>
            <option value="hotel">HOTEL</option>
            <option value="dance">DANCE</option>
            <option value="servicing">SERVICING</option>
            <option value="ebill">EBILL</option>
            <option value="credit">CREDIT CARD BILL</option>
            <option value="water">WATER BILL</option>
            <option value="onlineshooping">ONLINE SHOOPING</option>
            
        </select>  
        </div>
        <button onClick={AddExpense}>Add Expense</button>
        </div>
        <GetExpense setPremiumUser={setPremiumUser}/>
        {console.log(ispremiumuser)}
        <button >{ispremiumuser ? "you are a premium user":<Razorpay/>}</button>
        {/* <button><Razorpay/></button> */}
        <button>{ispremiumuser ? <Premium/> :""}</button>
    
        </>
  )
}

export default Expense