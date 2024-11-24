import OrderItem from "../../components/Buyer/Order/OrderItem.jsx";
import Pagination from "../../components/Navigation/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchOrders} from "../../redux/orderSlice.js";
import dataTemp from "../../data/orderData.json";
import axios from "axios";

function OrderHistory() {
    const [orders,setOrders] = useState([]);
    const [totalPages,setTotalPages] = useState(1);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    useEffect(() => {
        axios
        .get('http://localhost:8080/orders/history', config)
        .then((response) => {
            const data = response.data;
            if(data.code === 'OK') {
                setOrders(data.result.items);
                setTotalPages(data.result.totalPages);
            }
        })
        
        
    },[]);
    



    return (
        <div className='flex justify-center bg-[#F7FBFF] h-min-screen w-max-screen'>
            <div className='bg-white mt-10 mb-10'>
                <div className='pl-1 font-bold text-[12px] md:text-[14px] lg:text-lg pb-1 '>
                    ORDER HISTORY
                </div>

                <div
                    className='grid grid-cols-11 text-left text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] w-full h-[30px] md:h-[40px] border-4 border-[#E4E7E9] bg-[#F2F4F5] font-sans'>
                    <div className='col-span-1 pl-0 sm:pl-8'>
                        ID
                    </div>
                    <div className='col-span-3 pl-2 sm:pl-20'>
                        STATUS
                    </div>
                    <div className='col-span-3 pl-2 sm:pl-12'>
                        DATE
                    </div>
                    <div className='col-span-1 pl-0'>
                        TOTAL
                    </div>
                    <div className='col-span-3 pl-5 lg:pl-16 xl:pl-20'>
                        ACTION
                    </div>

                </div>
                <div>
                    {orders.map((orderItem) => (
                        <OrderItem
                            key={orderItem.orderId} item={orderItem}
                        />
                    ))}
                </div>
                <div className='flex justify-center mt-5 mb-5'>
                    <Pagination totalPage={totalPages}/>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;