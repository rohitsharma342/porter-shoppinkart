import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function PorterStatus() {
    const query = useQuery();
    const id = query.get('orderid');
    const [porter, setPorter] = useState(null);
    const [porterData, setPorterData] = useState(null);

    useEffect(() => {
        fetch(`http://139.59.64.38:80/api/porter/get/${id}`, {
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        .then((response) => {
            if (response.status) {
                setPorter(response.data);
            } else {
                setPorter(null);
                // toast.error("Failed to fetch porter details.");
            }
        })
        .catch(error => {
            console.error('Error fetching porter details:', error);
            toast.error("An error occurred while fetching porter details.");
        });
    }, [id]);

    const handleFetch = async (porterId) => {
        try {
            const response = await fetch(`http://139.59.64.38:80/proxy/v1/orders/${porterId}`, {
                // method: "GET",
                // headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setPorterData(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error("An error occurred while fetching porter data.");
        }
    };

    const handleCancel = async () => {
        try {
            const response = await fetch(`http://139.59.64.38:80/proxy/v1/orders/${porter.porterId}/cancel`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setPorterData(data);
            toast.success("Order cancelled successfully.");
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error("An error occurred while cancelling the order.");
        }
    };

    const formatTimestamp = (timestamp) => {
        return moment(timestamp).format('DD/MM/YYYY, HH:mm:ss'); // e.g., "11/06/2024, 12:34:56"
    };

    return (
        <>
            <ToastContainer />
            <div className="text-center mt-5">
                <h1 className="text-2xl font-bold">Porter Status</h1>
            </div>
            <div className="text-center mt-5">
                <button onClick={() => handleFetch(porter?.porterId)} className="bg-green-600 px-2 py-3 text-white">
                    View Details
                </button>
            </div>
            {porter && porterData ? (
                <div className="w-full text-center mt-10">
                    <div>
                        <p className="text-2xl font-bold">{porter.porterId}</p>
                        <p>pickup_time: {formatTimestamp(porterData?.order_timings?.pickup_time)}</p>
                        <p>order_accepted_time: {formatTimestamp(porterData?.order_timings?.order_accepted_time)}</p>
                        <p>order_started_time: {formatTimestamp(porterData?.order_timings?.order_started_time)}</p>
                        <p>order_ended_time: {formatTimestamp(porterData?.order_timings?.order_ended_time)}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{porterData.status}</p>
                        {porterData.status !== "cancelled" && (
                            <button onClick={handleCancel} className="bg-red-600 px-4 mt-5 text-white py-1">
                                Cancel Now
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-10">Loading...</div>
            )}
        </>
    );
}

export default PorterStatus;
