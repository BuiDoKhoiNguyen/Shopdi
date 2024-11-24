import React from 'react'
import OrderItem from '@/components/Buyer/Checkout/OrderItem'
import Payment from '@/components/Buyer/Checkout/Payment'
import AddressSelection from '@/components/Buyer/Checkout/AddressSelection'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { POST } from '../../api/GET'
export default function Checkout({ ProductList }) {
    let location = useLocation()
    let tmp = location.state.selectedProducts;
    let productsOfSeller = []
    for (let i = 0; i < tmp.length; i++) {
        if (productsOfSeller.find((item) => item.sellerId === tmp[i].sellerId) === undefined) {
            productsOfSeller.push({ sellerId: tmp[i].sellerId, products: [tmp[i]] })
        } else {
            productsOfSeller.find((item) => item.sellerId === tmp[i].sellerId)?.products.push(tmp[i])
        }
    }
    const addresses = []
    for (let i = 0; i < 8; i++) {
        let t = {
            id: i,
            firstName: "Nguyen",
            lastName: "Van Som" + i,
            address: "dia chi cua nguoi dung " + i,
            phone: `${i}${i}${i}${i}${i}${i}`
        }
        addresses.push(t)
    }
    const [currentAddress, setCurrentAddress] = useState(addresses[0])
    const [openAddress, setOpenAddress] = useState(false)
    const onClose = () => {
        setOpenAddress(!openAddress)
    }
    return (
        <div>
            {openAddress && <AddressSelection onClose={onClose} addresses={addresses} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />}
            <div className={`bg-white ${(openAddress ? "brightness-50" : "")}`}>
                <div className="flex flex-col gap-4 p-8 bg-gray-100 mr-40 ml-40">
                    <div className='border-b-2 border-gray-400 '>
                        <div className='text-xl text-red font-bold'>Dia chi nhan hang</div>
                        <div>{`
                         ${currentAddress.firstName} ${currentAddress.lastName} (+84) ${currentAddress.phone} , ${currentAddress.address}`}</div>
                        <div className="text-blue-500 hover:underline" onClick={() => setOpenAddress(!openAddress)}>Thay doi</div>
                    </div>
                    <div className="header flex flex-row w-full border-b-2 border-gray-400 pb-4">
                        <span className="grow pl-12">Ten san pham</span>
                        <span className="w-40 text-center">Gia</span>
                        <span className="w-40 text-center">So luong</span>
                        <span className="w-40 text-center">Thanh tien</span>
                    </div>
                    <div>
                        {productsOfSeller.map((item) =>
                            <div key={item.sellerId}>
                                <div className="text-xl font-bold">Shop : {item.products[0].sellerName}</div>
                                {item.products.map((item) => <OrderItem key={item.cartItemId} item={item} />)}
                            </div>)}
                    </div>
                    <div className="flex flex-row">
                        <div className="w-4/6">
                            <Payment /></div>
                        <div className="text-left text-xl w-80">
                            <div className="flex flex-row justify-between">
                                <p className='inline-block'>Tiền hàng :</p>
                                <p className='inline-block'>{tmp.reduce((a, b) => a + b.price * b.quantity, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4 border-b-2 border-gray-400">
                                <p className='inline-block'>Phí vận chuyển :</p>
                                <p className='inline-block'>{Number(0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4">
                                <p className='inline-block'>Tổng tiền :</p>
                                <p className='inline-block'>{tmp.reduce((a, b) => a + b.price * b.quantity, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    for (let i = 0; i < productsOfSeller.length; i++) {
                                        
                                        POST('orders/checkout', {
                                            "addressId": 2,
                                            "selectedCartItemIds": productsOfSeller[i].products.map((item) => item.cartItemId),
                                        }).then((res) => {
                                            if (res.code === "OK") {
                                                alert("Dat hang thanh cong")
                                            }
                                        })
                                    }

                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}