import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
function PorterStatus() {
    const query = useQuery();
    const id = query.get('orderid');
    const userId = query.get('userid');
    const [porter,setPorter]=useState(null)
    useEffect(()=>{
        fetch(`http://localhost:80/api/porter/get/${id}`,{
            headers: { "Content-Type": "application/json" },
        }).then((res)=>{return res.json()})
        .then((response)=>{
           if(response.status==true){
            setPorter(response.data)
            console.log(response)
           }else{
            setPorter(null)
           }
        })
        try {
            const response =  fetch('http://localhost:80/proxy/v1/orders/CRN1716800105713', {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            //   body: JSON.stringify(formData)
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
      
            const data =  response.json();
            // console.log(data.order_id)
         
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
      },[])

    return ( 
        <>
        <div className="text-center mt-5">
            <h1 className="text-2xl font-bold">Porter Status</h1>
        </div>
        {porter!==null &&
        <div className="w-full text-center mt-10">
        <div>
            <p className="text-2xl font-bold">{porter.porterId}</p>
            <p>pickup_time : 12345</p>
            <p>order_accepted_time : 12345</p>
            <p>order_started_time : 12345</p>
            <p>order_ended_time : 12345</p>
        </div>
        <div>
        <p className="text-2xl font-bold">OPEN</p>
           <button className="bg-red-600 px-4 mt-5 text-white py-1">Cancle Now</button>
        </div>
        </div>
}
        </>
     );
}

export default PorterStatus;