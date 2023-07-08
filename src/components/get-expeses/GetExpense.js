import React,{useEffect, useState} from 'react';
import axios from 'axios';
const GetExpense = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        const token =localStorage.getItem("token")
        console.log(token)
        fetch("http://localhost:4000/expense/getexpenses",{headers:{"Authorization":token}})
        .then(res=>res.json())
        .then(data=>setData(data.expenses))
    },[])
    const [show,setShow] = useState({})
    // const token =localStorage.getItem("token")
    // axios.get("http://localhost:4000/expense/getexpenses",{headers:{"Authorization":token}})
    // .then(res=>setData(res))
  
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