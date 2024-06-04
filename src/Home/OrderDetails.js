import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function OrderDetails() {
  const query = useQuery();
  const id = query.get("orderid");
  const userId = query.get("userid");
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:80/api/users/${userId}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response)
        setUser(response.user);
      });
    fetch(`http://localhost:80/api/orders/track?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response)
        setOrder(response.completeOrder);
      });
  }, []);
  const [delivery_instructions, setdelivery_instructions] = useState({
    instructions_list: [
      {
        type: order?.deliveryInstruction || "cx",
        description: order?.deliveryInstruction || "cx",
      },
    ],
  });

  const [pickup_details, setpickup_details] = useState({
    address: {
      apartment_address: "Alankar",
      street_address1: "central spine",
      street_address2: "two",
      landmark: "dominos",
      city: "jaipur",
      state: "Rajasthan",
      pincode: "302039",
      country: "India",
      lat: 12.9165757,
      lng: 77.6101163,
      contact_details: {
        name: "Rohit",
        phone_number: "7877575481",
      },
    },
  });

  const [drop_details, setdrop_details] = useState({
    address: {
      apartment_address: order?.houseNo || "xc",
      street_address1: order?.street || "cx",
      street_address2: "two" || "c",
      landmark: order?.landmark || "cx",
      city: order?.city || "cx ",
      state: order?.state || "cx",
      pincode: order?.pincode || "cx",
      country: "India",
      lat: user?.lat || 12.9165757,
      lng: user?.long || 77.6101163,
      contact_details: {
        name: order?.companyName || "cx",
        phone_number: user?.phone || "7877575481",
      },
    },
  });
  const [request_id, setrequest_id] = useState("rohittest0001");
  const handleRequestPorter = async () => {
    // if(!user.lat || !user.long){
    //     alert("hello enter your lat long")
    // }else{
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

    // const formData ={request_id,delivery_instructions,pickup_details,drop_details}
    console.log(requestBody);
    try {
      const response = await fetch(
        "http://localhost:80/proxy/v1/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "d8635c60-09b4-4c44-828f-d2da5bf56c79"
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
       console.log(data.order_id)
      fetch(
        `http://localhost:80/api/porter/request/${id}?porterId=${data.order_id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // console.log(response)
          // setOrder(response.completeOrder)
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  // }

  return (
    <>
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
              <b>ORDER STATUS</b> : {order?.trackingDetails?.title}
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
              <b>AMOUNT</b> : {order?.totalAmount}
            </h1>
          </div>
          {order.orderStatus === 0 && (
            <div>
              <button
                className=" bg-blue-700 px-3 py-2 mb-10 text-white"
                onClick={handleRequestPorter}
              >
                REQ on Porter
              </button>
            </div>
          )}
        </div>
        <Divider />
      </div>
    </>
  );
}

export default OrderDetails;
