import React, { useState } from 'react'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg';
import Variant from '@/components/buyer/Variant';
import Quantity from './Quantity';
export default function CartItem({ cart_item_id, setTotal ,total}) {

    const item = {
        id: cart_item_id,
        name: `Product ${cart_item_id}`,
        quantity: cart_item_id+1,
        image: shopdiLogo,
        price: 100,
        variant: [{ type: "mau sac", value: "xanh" }, { type: "kich thuoc", value: "S" }]
    }
    const [quantity, setQuantity] = useState(item.quantity);
    const [variant, setVariant] = useState(item);
    const [isOpen, setIsOpen] = useState(false);
    const onChangeVariant = (type, value) => {
        let tmp = { ...variant }
        for (let i = 0; i < tmp.variant.length; i++) {
            if (tmp.variant[i].type === type) {
                tmp.variant[i].value = value
            }
        }
        setVariant(tmp)
    }
    return (
        <div className="flex flex-row h-20 items-center">
            <div className="h-fit"><input type="checkbox" onChange={(e) => {e.target.checked ? setTotal(total+item.price*quantity) : setTotal(total-item.price*quantity)}}></input></div>
            <div><img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></div>
            <span className="h-fit w-full">{item.name}</span>
            <div className="flex flex-row w-2/6 relative" >
                <button className="variant-btn h-fit " onClick={() => { setIsOpen(!isOpen) }}>
                    <div className="flex flex-row">Phan loai
                        <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                <div className={`variants absolute ${isOpen ? 'block' : 'hidden'} p-4 border border-gray-200 right-0 top-4 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <Variant product_id={item.id} onChangeVariant={onChangeVariant} currentVariant={variant.variant}/>
                </div>
            </div>
            <span className="w-1/6">{item.price}</span>

            <Quantity className="w-1/6" quantity={quantity} setQuantity={setQuantity} />
            <span className="w-1/4 text-center">{item.price * quantity}</span>
        </div>
    )
}