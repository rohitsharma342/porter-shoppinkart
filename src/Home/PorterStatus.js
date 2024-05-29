function PorterStatus() {
    return ( 
        <>
        <div className="text-center">
            <h1 className="text-2xl font-bold">Porter Status</h1>
        </div>
        <div className="w-full text-center mt-10">
        <div>
            <p className="text-2xl font-bold">CRN1716800105713</p>
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
        </>
     );
}

export default PorterStatus;