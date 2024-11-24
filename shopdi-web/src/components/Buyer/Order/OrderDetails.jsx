import React, { useEffect, useState } from 'react';
import {styled} from "@mui/material/styles";
import axios from 'axios';

import {Button, Step, StepLabel, Stepper, Typography} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import StepConnector, {stepConnectorClasses,} from "@mui/material/StepConnector";
import orderDetailData from '../../../data/orderDetailData.json';
import { useParams } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

const steps = ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];
const icons = [<InventoryOutlinedIcon/>, <EmailOutlinedIcon/>, <LocalShippingOutlinedIcon/>, <HandshakeOutlinedIcon/>];
const data = [
    ['PRODUCTS', 'PRICE', 'QUANTITY', 'TOTAL'],
];

const CustomisedConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 8,
        borderColor: '#FF9800',
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',

    },
}));

function OrderDetails() {
    const {id} = useParams();
    const [orderDetail,setOrderDetail] = useState({});
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${id}/details`, config)
            .then((response) => {
                if (response.data.code === 'OK') {
                    setOrderDetail(response.data.result);
                    console.log('Order detail:', response.data.result); // Log dữ liệu chi tiết
                } else {
                    console.warn('Unexpected response:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching order details:', error.response?.data || error.message);
            });
    }, [id]);
    const status = orderDetail.status;
    const activeStep = status === 'PENDING' ? 1 
                        : status === 'PROCESSING' ? 3 : 4;
    const date = orderDetail?.date;
    const formattedDate = date ? new Date(...date).toLocaleString() : "N/A";
    const shippingAddress = orderDetail?.shippingAddress || {};
    const { firstName = '', lastName = '', address = '', city = '', state = '' } = shippingAddress;
    return (
        <div className="bg-[#F7FBFF] flex justify-center font-sans">
            <div className="container md:mt-10 md:mb-10 my-5 h-5/6  bg-white w-full md:w-5/6 border-collapse">
                {/* heading section */}
                <div className="flex justify-between items-center border-2 h-6 md:h-10 mb-6 px-0 md:px-4">
                    <div className="flex items-center">
                        <ArrowBackIcon className="text-black" fontSize={'inherit'}/>
                        <Button><span className='text-black text-[14px] md:text-[16px]'>Order Details</span></Button>
                    </div>
                    <Button><span className='text-[#FA8232] text-[14px] md:text-[16px]'>Leave a Rating</span></Button>
                </div>
                {/* Order Details Section */}
                <div className="bg-[#FDFAE7] border-2 border-[#F7E99E] p-3 md:p-6 w-5/6 mb-3 md:mb-6 ml-6 md:ml-20 border-collapse">
                    <div className="flex justify-between items-center">
                        <div className={'text-[16px]'}>
                            Order #{orderDetail.orderId}
                        </div>
                        <div className={'text-[18px] font-bold text-celticBlue'}>
                            ${orderDetail.total}
                        </div>
                    </div>
                    <div className={'text-[14px] text-darkGray pt-1.5'}>
                        Order placed on {formattedDate.split(",")[0]} at  {formattedDate.split(",")[1]}
                    </div>
                </div>
                {/* <div className='ml-2 md:ml-20'>
                    <div className='text-darkGray text-[16px]'>
                        Order expected arrival: <strong>23 Jun, 2021</strong>
                    </div>
                </div> */}

                {/* Stepper for Order Status */}
                <div className="bg-white border-b-2 p-2 md:p-6 mb-3 md:mb-6 border-collapse">
                    <Stepper activeStep={activeStep} alternativeLabel connector={<CustomisedConnector/>}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            color: index < activeStep ? '#FF731D' : '#FFFFFF', // Color for completed steps
                                            border: '4px solid #FF731D', // Border color
                                            borderRadius: '50%', // Optional: make the border circular
                                            fontSize:{xs:'22px',sm:'22px',md:'26px',lg:'26px',xl:'26px'},
                                            '&.Mui-active': {
                                                color: '#FF731D', // Color for the current step

                                            },
                                            '&.Mui-completed': {
                                                color: '#FF731D', // Color for completed steps
                                            },
                                            '&.Mui-incompleted': {
                                                color: '#FF731D', // Color for incompleted steps
                                            },
                                            '& .MuiStepIcon-text': {
                                                fill: 'transparent', // Change color of the step number text
                                            },
                                        },
                                    }}

                                >
                                   <span className={'text-[12px] md:text-[16px]'}>{label}</span>
                                    <span className="flex justify-center mt-2">
                    {React.cloneElement(icons[index], {
                        style: {
                            fontSize: {xs:'22px',sm:'22px',md:'26px',lg:'26px',xl:'26px'},
                            color: index === activeStep ? '#FF731D' : index < activeStep ? '#2DB224' : '#FF8800',
                        },
                    })}
                  </span>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                {/* Order Activity Section */}
                <div className="bg-white border-b-2 px-3 py-1 md:p-6 md:pt-0">
                    <div className={'mb-1 font-bold text-[16px] md:text-xl'}>
                        Order Activity
                    </div>
                    <div>
                        <ul className="text-sm space-y-4">
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF7E9] border-[#D5F0D3] size-10 '>
                                    <DoneAllIcon className='text-[#2DB224]'/>
                                </div>

                                <div className='px-3'>
                                    <div>
                                        <span className={"text-[14px] md:text-[18px]"}> Your order has been delivered. Thank you for shopping at Clicon! </span>
                                    </div>
                                    <div className={"text-[14px] md:text-[18px]"}>
                                        23 Jun, 2021
                                    </div>
                                </div>
                            </li>
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                                    <PersonOutlineOutlinedIcon className='text-[#2DA5F3]'/>
                                </div>

                                <div className={"px-3 text-[14px] md:text-[18px]"}>
                                    <div>
                                        <span > Our delivery man John Wick has picked up your order. </span>
                                    </div>
                                    <div>
                                        23 Jun, 2021
                                    </div>
                                </div>
                            </li>
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                                    <LocationOnOutlinedIcon className='text-[#2DA5F3]'/>
                                </div>

                                <div className={"px-3 text-[14px] md:text-[18px]"}>
                                    <div>
                                        <span> Your order has reached the last mile hub. </span>
                                    </div>
                                    <div>
                                        21 Jun, 2021
                                    </div>
                                </div>
                            </li>
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                                    <MapOutlinedIcon className='text-[#2DA5F3]'/>
                                </div>

                                <div className={"px-3 text-[14px] md:text-[18px]"}>
                                    <div>
                                        <span> Your order is on the way to the last mile hub. </span>
                                    </div>
                                    <div>
                                        21 Jun, 2021
                                    </div>
                                </div>
                            </li>
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF7E9] border-[#D5F0D3] size-10 '>
                                    <CheckCircleOutlinedIcon className='text-[#2DB224]'/>
                                </div>

                                <div className={"px-3 text-[14px] md:text-[18px]"}>
                                    <div>
                                        <span> Your order is successfully verified.</span>
                                    </div>
                                    <div>
                                        20 Jun, 2021
                                    </div>
                                </div>
                            </li>
                            <li className='flex flex-row items-center'>
                                <div
                                    className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                                    <EventNoteOutlinedIcon className='text-[#2DA5F3]'/>
                                </div>

                                <div className={"px-3 text-[14px] md:text-[18px]"}>
                                    <div>
                                        <span>Your order has been confirmed. </span>
                                    </div>
                                    <div>
                                        19 Jun, 2021
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Product Section */}
                <div className="bg-white border-b-2 md:p-6 p-2 font-sans">
                    <div className={'text-[14px] font-bold md:text-xl'}>
                        Product {(orderDetailData.length)}
                    </div>
                    <table className="min-w-full border border-gray-200">
                        <thead>
                        <tr>
                            {data[0].map((header, index) => (
                                <th key={index}
                                    className=" bg-[#F2F4F5] border-t border-b border-[#E4E7E9] p-1 text-left text-[12px] md:text-[18px]">
                                    {header}
                                </th>
                            ))}
                        </tr>

                        </thead>
                        <tbody>
                        {orderDetailData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='flex items-center text-[12px] md:text-[18px]'>
                                    <img className="md:w-20 md:h-20 w-8 h-8 " src={row.image} alt="temp"/>
                                    {row.name}
                                </td>
                                <td className='pl-0 md:pl-3 text-[12px] md:text-[18px]'>{row.price}</td>
                                <td className='pl-0 md:pl-3 text-[12px] md:text-[18px]'>{row.quantity}</td>
                                <td className='pl-0 md:pl-3 text-[12px] md:text-[18px]'>{row.subTotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Billing and Shipping Section */}
                <div className="bg-white border-b-2 p-2 md:p-6 mb-0">
                    <div className="md:grid md:grid-cols-3 md:gap-4">
                        <div>
                            <div className='text-[16px] md:text-[20px] font-bold mt-2 md:pb-4'>Billing Address</div>
                            <div className='text-[14px] md:text-[18px]'>Kevin Gilbert </div>
                            <div className=' text-[14px] md:text-[18px] text-[#5F6C72]'>
                                East Tejturi Bazar, Ward No. 04, Road No. 15, <br/>
                                Dhaka-1208, Bangladesh <br/>
                                Phone Number: +202-555-0118 <br/>
                                Email: kevin.gilbert@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className='text-[16px] md:text-[20px] font-bold mt-2 md:pb-4'>Shipping Address</div>
                            <div className='text-[14px] md:text-[18px]'>{firstName + " " + lastName} </div>
                            <div className=' text-[14px] md:text-[18px] text-[#5F6C72]'>
                                <a href="">{address}</a> <br/>
                                {city + ', ' + state } <br/>
                                Phone Number: +202-555-0118 <br/>
                                Email: kevin.gilbert@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className='text-[16px] md:text-[20px] font-bold mt-2 md:pb-4'>Order Notes</div>
                            <div className=' text-[14px] md:text-[18px] text-[#5F6C72]'>
                                Some notes about the order such as special delivery instructions or other information.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;