import React, { useEffect, useState } from 'react'
import { JSONToData } from '@/utils/todo.js';
import { GET, POST } from '../../api/GET.jsx';
import { useNavigate } from 'react-router-dom';
export default function CartItem({ onSelect, selectedProducts, onDelete, item, setTotal, total }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [variant, setVariant] = useState(item);
    const [isOpen, setIsOpen] = useState(false);
    const isSelected = (item) => {
        let tmp = [...selectedProducts]
        return tmp.includes(item)
    }
    const navigate = useNavigate();
    // useEffect(() => {
    //     GET("products/" + item.productId).then((data) => {
    //         if (data.code === "OK") {
    //             setPrice(data.result.price);
    //         }
    //     })
    // }, [])
    return (
        <div className="flex flex-row h-20 items-center font-sans">
            <div className="h-fit"><input className="w-4 h-4" type="checkbox" defaultChecked={isSelected(item)} onChange={(e) => {
                if (e.target.checked) {
                    setTotal(total + item.price * quantity);
                    onSelect(item);
                } else {
                    setTotal(total - item.price * quantity);
                    onSelect(item);
                }

            }}></input></div>
            <div onClick={() => { navigate(`/product/${item.productId}`) }}> <img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></div>
            <span className="h-fit grow pl-4">{item.productName}</span>
            <div className="w-40 text-center relative" >
                {JSONToData(item.variant)}

            </div>
            <span className="w-40 text-center">{item.price.toLocaleString()}</span>

            <div className="w-40 flex flex-row justify-center">
                <div className='flex flex-row max-h-8 w-fit'>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1); isSelected(item) && setTotal(total - item.price) }}>-</button>
                    <div className='min-w-16 text-center border-gray-300 border-y-2'><span >{quantity}</span></div>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { setQuantity(quantity + 1); isSelected(item) && setTotal(total + item.price) }}>+</button>
                </div>
            </div>
            <span className="w-40 text-center ">{(item.price * quantity).toLocaleString()}</span>
            <div className='w-40 text-center'><button onClick={() => { onDelete(item.cartItemId); isSelected(item) && setTotal(total - item.price * quantity) }} className="text-center color-black hover:text-red">Xoa</button></div>
        </div>
    )
}