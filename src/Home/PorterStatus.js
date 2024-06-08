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
    const [porterData,setPorterData]=useState({})

  

     
    useEffect(()=>{
        fetch(`http://139.59.64.38:80/api/porter/get/${id}`,{
            headers: { "Content-Type": "application/json" },
        }).then((res)=>{return res.json()})
        .then((response)=>{
           if(response.status==true){
            setPorter(response.data)
            console.log(response)
            handleFetch()
           }else{
            setPorter(null)
           }
        })
      
      },[query])
      const handleFetch=async ()=>{
      console.log(porter)
        try {
            const response= await fetch(`http://139.59.64.38:80/proxy/v1/orders/${porter.porterId}`, {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    // 'x-api-key': 'd8635c60-09b4-4c44-828f-d2da5bf56c79'
                  }
             
         
             })
             
                 if (!response.ok) {
                     throw new Error('Network response was not ok ' + response.statusText);
                   }else{
             
                   const data =await  response.json();
                    console.log(data)
                setPorterData(data)
                   }
        
       
            
           } catch (error) {
             console.error('There was a problem with the fetch operation:', error);
           }
    }
    return ( 
        <>
        <div className="text-center mt-5">
            <h1 className="text-2xl font-bold">Porter Status</h1>
        </div>
        {porter!==null &&
        <div className="w-full text-center mt-10">
        <div>
            <p className="text-2xl font-bold">{porter.porterId}</p>
            <p>pickup_time : {`${new Date(porterData?.order_timings?.pickup_time).getDate()}/${new Date(porterData?.order_timings?.pickup_time).getMonth()+1}/${new Date(porterData?.order_timings?.pickup_time).getFullYear()},${new Date(porterData?.order_timings?.pickup_time).getHours()}:${new Date(porterData?.order_timings?.pickup_time).getMinutes()}`}</p>
            <p>order_accepted_time : {`${new Date(porterData?.order_timings?.order_accepted_time).getDate()}/${new Date(porterData?.order_timings?.order_accepted_time).getMonth()+1}/${new Date(porterData?.order_timings?.order_accepted_time).getFullYear()},${new Date(porterData?.order_timings?.order_accepted_time).getHours()}:${new Date(porterData?.order_timings?.order_accepted_time).getMinutes()}`}</p>
            <p>order_started_time : {`${new Date(porterData?.order_timings?.order_started_time).getDate()}/${new Date(porterData?.order_timings?.order_started_time).getMonth()+1}/${new Date(porterData?.order_timings?.order_started_time).getFullYear()},${new Date(porterData?.order_timings?.order_started_time).getHours()}:${new Date(porterData?.order_timings?.order_started_time).getMinutes()}`}</p>
            <p>order_ended_time : {`${new Date(porterData?.order_timings?.order_ended_time).getDate()}/${new Date(porterData?.order_timings?.order_ended_time).getMonth()+1}/${new Date(porterData?.order_timings?.order_ended_time).getFullYear()},${new Date(porterData?.order_timings?.order_ended_time).getHours()}:${new Date(porterData?.order_timings?.order_ended_time).getMinutes()}`}</p>
        </div>
        <div>
        <p className="text-2xl font-bold">{porterData.status}</p>
           {/* <button className="bg-red-600 px-4 mt-5 text-white py-1">Cancle Now</button> */}
        </div>
        </div>
}
        </>
     );
}

export default PorterStatus;