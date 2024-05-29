import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
function OrderDetails() {
    const query = useQuery();
  const id = query.get('orderid');
  const userId = query.get('userid');
  const [order,setOrder]=useState({})
  const [user,setUser]=useState({})


//   useEffect(()=>{
//     fetch(`http://localhost:80/api/users/${userId}`,{
//         headers: { "Content-Type": "application/json" },
//     }).then((res)=>{return res.json()})
//     .then((response)=>{
//         console.log(response)
//         setUser(response.user)
//     })
//     fetch(`http://localhost:80/api/orders/track?id=${id}`,{
//         headers: { "Content-Type": "application/json"},
//     }).then((res)=>{return res.json()})
//     .then((response)=>{
//         console.log(response)
//         setOrder(response.completeOrder)
//     })
//   },[])
  const [delivery_instructions,setdelivery_instructions]=useState({
    instructions_list:[
        {
            type: "order.deliveryInstruction",
            description: "order.deliveryInstruction"
        }
    ]
  })

  const [pickup_details,setpickup_details]=useState({
    address:{
        apartment_address:"Alankar",
        street_address1:"central spine",
        street_address2:"",
        landmark:"dominos",
        city:"jaipur",
        state:"Rajasthan",
        pincode:"302039",
        country:"India",
        lat:342343,
        lng:32324,
        contact_details:{
            name:"Rohit",
            phone_number:"7877575481"
        }
    }
  })

  const [drop_details,setdrop_details]=useState({
    address:{
        apartment_address:"order.houseNo",
        street_address1:"order.street",
        street_address2:"",
        landmark:"order.landmark",
        city:"order.city",
        state:"order.state",
        pincode:"order.pincode",
        country:"India",
        lat:"user?.lat",
        lng:"user?.long",
        contact_details:{
            name:"order.companyName",
            phone_number:"user?.phone"
        }
    }
  })
const [request_id,setrequest_id]=useState("id")
function handleRequestPorter(){
    // if(!user.lat || !user.long){
    //     alert("hello enter your lat long")
    // }else{
        const formData ={request_id,delivery_instructions,pickup_details,drop_details}
        fetch(`https://cors-anywhere.herokuapp.com/https://pfe-apigw-uat.porter.in/v1/orders/create`,{
            method:"POST",
            headers: { "x-api-key":"d8635c60-09b4-4c44-828f-d2da5bf56c79","Content-Type": "application/json" },
            body:JSON.stringify(formData)
        }).then((res)=>{return res.json()})
        .then((response)=>{
            console.log(response)
           
        })
    // }
}
    return ( 
        <>
        <h1 className="ms-10 mt-10">Order Details:</h1>

        <div className="flex ms-10 mt-10">
            
          <div className="flex justify-around space-x-20">
            <div>
                <h1><b>ORDER ID</b> : {id}</h1>
            </div>
            <div>
                <h1><b>ORDER STATUS</b> : {"order?.trackingDetails?.title"}</h1>
            </div>
            <div>
                <h1><b>USER NAME</b> : {"order?.companyName"}</h1>
            </div>
            <div>
                <h1><b>USER PHONE</b> : {"user?.phone"}</h1>
            </div>
            <div>
                <h1><b>AMOUNT</b> : {"order?.totalAmount"}</h1>
            </div>
            <div>
               <button className=" bg-blue-700 px-3 py-2 mb-10 text-white" onClick={handleRequestPorter}>REQ on Porter</button>
            </div>
          </div>
          <Divider/>
        </div>
        </>
     );
}

export default OrderDetails;