import OrderDetails from "./OrderDetails";
import PorterStatus from "./PorterStatus";

function Home() {
    return ( 
        <>
        <div className="text-center">
            <h1 varient="h1" className=" text-3xl font-bold ">ShoppinKart X Porter</h1>
        </div>
        <OrderDetails/>
        <PorterStatus/>
        </>
     );
}

export default Home;