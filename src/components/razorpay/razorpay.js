import React , {useState} from 'react';
import axios from 'axios';
import useRazorpay from "react-razorpay";
const Razor = () => {
    // const [premium,notPremium]=useState();
    const Razorpay = useRazorpay();
    const payment =async(e)=>{
        const token=localStorage.getItem('token');
        const response= await axios.get("http://localhost:4000/purchase/premiummembership",{headers:{"Authorization":token}})
        console.log("razorpay",response)
        var options=
        {
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            // handler use for success payment
            "handler":async function(response){
               const res= await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                },{headers:{"Authorization":token}})
                console.log(res)
    
                alert('You are a premium user Now')
                localStorage.setItem('token',res.data.token)
            }
        }
        const rzp1=new Razorpay(options);
        rzp1.open();
        e.preventDefault();
        rzp1.on('payment failed',function(response){
            console.log(response)
            alert('something went wrong')
        })
    }

  return (
    <>
        <button onClick={payment}>Buy Premium</button>
    </>
  )
}

export default Razor