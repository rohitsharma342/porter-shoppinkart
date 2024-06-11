import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import DialogLocation from "./DialogLocation";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function OrderDetails() {
  const query = useQuery();
  const id = query.get("orderid");
  const userId = query.get("userid");
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [button,setButton]=useState(false)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [delivery_instructions, setdelivery_instructions] = useState({
    instructions_list: [
      {
        type: order?.deliveryInstruction || "cx",
        description: order?.deliveryInstruction || "cx",
      },
      {
        type: order?.deliveryInstruction || "cx",
        description: order?.deliveryInstruction || "cx",
      },
    ],
  });

  const [pickup_details, setpickup_details] = useState({
    address: {
      apartment_address: "Divya Plaza",
      street_address1: "Nagar Nigam Rd, Gurjaron Ka Mohalla, Dada Gurudev Nagar",
      street_address2: "",
      landmark: "HDFC Bank",
      city: "jaipur",
      state: "Rajasthan",
      pincode: "302029",
      country: "India",
      lat: 26.8187572,
      lng: 75.7802418,
      contact_details: {
        name: "Aditya",
        phone_number: "+918302607122",
      },
    },
  });

  const [drop_details, setdrop_details] = useState({
    address: {
      apartment_address: order?.houseNo || "demo",
      street_address1: order?.street || "cxsdcsdc",
      street_address2: "twoddcscsc" || "c",
      landmark: order?.landmark || "cxsdcdsc",
      city: order?.city || "cxdscsdc ",
      state: order?.state || "Rajashthan",
      pincode: order?.pincode || "cxsdcdsc",
      country: "India",
      lat: user?.lat || 12.9165757,
      lng: user?.long || 77.6101163,
      contact_details: {
        name: order?.companyName || "cxdcsdcdsc",
        phone_number: user?.phone || "+917877575481",
      },
    },
  });
  const [request_id, setrequest_id] = useState(`shoppinKarts_delivery_request_id_${id}`);
  useEffect(() => {
    fetch(`http://139.59.64.38:80/api/users/${userId}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response)
        setUser(response.user);
        // setdrop_details({
        //   address:{
        //     lat:response.user?.lat,
        //     long:response.user?.long,
        //     contact_details:{
        //       name:order?.companyName,
        //       phone_number:`$+91${response.user?.phone}`
        //     }
        //   },
          
        // })
      });
    fetch(`http://139.59.64.38:80/api/orders/track?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
         console.log(response.completeOrder)
        setOrder(response.completeOrder);
        setdelivery_instructions({
          instructions_list:[
            {type:"text" || "this is instruction",
              description:response.completeOrder.deliveryInstruction || "this is instruction"
            }
          ]
        })
        
        setdrop_details({
          address:{
          apartment_address: response.completeOrder.shippingDetails?.houseNo,
      street_address1: response.completeOrder?.shippingDetails?.street || "cxsdcsdc",
      street_address2: "" || "",
      landmark: response.completeOrder?.shippingDetails?.landmark || "cxsdcdsc",
      city: response.completeOrder?.shippingDetails?.city || "cxdscsdc ",
      state: response.completeOrder?.shippingDetails?.state || "cxsdsd",
      pincode: response.completeOrder?.shippingDetails?.pincode || "cxsdcdsc",
      country: "India",
      lat: response.completeOrder.theUser?.lat ,
      lng: response.completeOrder.theUser?.long ,
      contact_details:{
        name:response.completeOrder?.companyName || "shopinKarts",
        phone_number:`+91${response.completeOrder?.shippingDetails?.phone}`
      }
          },
     
      });

      });
      console.log(request_id,
        delivery_instructions,
        pickup_details,
        drop_details)
  }, [id,userId]);
  useEffect(()=>{
    fetch(`http://139.59.64.38:80/api/porter/get/${id}`,{
        headers: { "Content-Type": "application/json" },
    }).then((res)=>{return res.json()})
    .then((response)=>{
       if(response.status==true){
           setButton(false)
       
       }else{
        setButton(true)
       }
    })
  
  },[query])

 

  const handleRequestPorter = async () => {
    if(!user.lat || !user.long){
        handleClickOpen()
    }else{
    const requestBody = {
      request_id: "Shopinkarts_order_00004",
      delivery_instructions: {
        instructions_list: [
          {
            type: "text",
            description: "handle with care",
          },
          {
            type: "text",
            description: "Test order 52",
          },
        ],
      },
      pickup_details: {
        address: {
          apartment_address: "27",
          street_address1: "Sona Towers",
          street_address2: "Krishna Nagar Industrial Area",
          landmark: "Hosur Road",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560029",
          country: "India",
          lat: 12.939391726766775,
          lng: 77.62629462844717,
          contact_details: {
            name: "Porter Test User",
            phone_number: "+911234567890",
          },
        },
      },
      drop_details: {
        address: {
          apartment_address: "this is apartment address",
          street_address1: "BTM Layout",
          street_address2: "Another street address",
          landmark: "BTM Layout",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560029",
          country: "India",
          lat: 12.9165757,
          lng: 77.6101163,
          contact_details: {
            name: "Porter Test User",
            phone_number: "+911234567890",
          },
        },
      },
    };

    const formData = {
      request_id,
      delivery_instructions,
      pickup_details,
      drop_details,
    };
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(
        "http://139.59.64.38:80/proxy/v1/orders/create",
        {
          method: "POST",

          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        toast.error("Network response was not ok")
        throw new Error("Network response was not ok " + response.statusText);
      }
      toast.success("Order Requested Successfully")
      const data = await response.json();
      console.log(data);
      fetch(
        `http://139.59.64.38:80/api/porter/request/${id}?porterId=${data.order_id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
        //  window.location.reload()
        toast.success(response.message)
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  }

  return (
    <>
    <ToastContainer/>
      <h1 className="ms-10 mt-10">Order Details:</h1>

      <div className="flex ms-10 mt-10">
        <div className="flex justify-around space-x-20">
          <div>
            <h1>
              <b>ORDER ID</b> : {id}
            </h1>
          </div>
          <div>
            <h1>
              <b>ORDER STATUS</b> : {order.orderStatus==0 && "Order placed"}  {order.orderStatus==1 && "Processing"}  {order.orderStatus==2 && "Out for delivery"}  {order.orderStatus==3 && "Delivered"}  {order.orderStatus==4 && "Cancelled"}  {order.orderStatus==5 && "Order Replace"}
            </h1>
          </div>
          <div>
            <h1>
              <b>USER NAME</b> : {order?.companyName}
            </h1>
          </div>
          <div>
            <h1>
              <b>USER PHONE</b> : {user?.phone}
            </h1>
          </div>
          <div>
            <h1>
              <b>AMOUNT</b> : {order?.finalAmount}
            </h1>
          </div>
          <DialogLocation handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} userId={userId}/>
          {order.orderStatus === 0 && button===true ? (
            <div>
              <button
                className=" bg-blue-700 px-3 py-2 mb-10 text-white"
                onClick={handleRequestPorter}
              >
                REQ on Porter
              </button>
            </div>

          ):
          (
            <div></div>
          )
          }
        </div>
        <Divider />
      </div>
    </>
  );
}

export default OrderDetails;
