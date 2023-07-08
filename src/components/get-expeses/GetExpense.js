import React,{useEffect, useState} from 'react';
import axios from 'axios';
const GetExpense = ({setPremiumUser}) => {
    const [data,setData] = useState([])
    const[ispremiumuser,setPremUser] =useState(false)
    useEffect(()=>{
        const token =localStorage.getItem("token")
        console.log(token)
        fetch("http://localhost:4000/expense/getexpenses",{headers:{"Authorization":token}})
        .then(res=>res.json())
        .then(data=>setData(data.expenses))
            const decodeToken=parseJwt(token)
            console.log(decodeToken)
            const ispremiumuser=decodeToken.ispremiumuser
            console.log("ispremiumuser",ispremiumuser)
            if(ispremiumuser){
                setPremUser(ispremiumuser)
                setPremiumUser(ispremiumuser)
            }
            
       
    },[])
    const [show,setShow] = useState({})
    // const token =localStorage.getItem("token")
    // axios.get("http://localhost:4000/expense/getexpenses",{headers:{"Authorization":token}})
    // .then(res=>setData(res))
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
   const Delete =(e)=>{
        const expenseid=e.target.id
        const token =localStorage.getItem("token")
        axios.delete(`http://localhost:4000/expense/deleteexpense/${expenseid}`,{headers:{"Authorization":token}})
        .then(res=>{
            // alert(res.data.message)
            const updateData = data
            setData(updateData)

        })
   }
  return (
      <div>
        {console.log("recta",data)}
        <h1>My Expenses</h1>
        <ul>
        {
        data.map(each=>{
            return(
                <li key={each.id}>ExpenseAmout:{each.expenseamount} Category:{each.category} <button onClick={Delete} id={each.id} >Delete Expense</button></li>
            //     <buttton onCLick={()=>deleteExpenses(each.id)}>delete Expenses</buttton> write like this also
            )
            
        })
        }
        </ul>
    </div>
  )
}

export default GetExpense