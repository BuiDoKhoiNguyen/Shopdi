import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
export default function Cart({ productInCart, selectedProducts,onSelect,setTotal,total,onDelete}) {
    
    return (
        <div className="flex flex-col w-full font-sans">
            <div className="header flex flex-row w-full">
                <input type="checkbox"></input>
                <span className="grow pl-12">Tên sản phẩm</span>
                <span className="w-40 text-center">Giá</span>
                <span className="w-40 text-center">Số lượng</span>
                <span className="w-40 text-center">Thành tiền</span>
                <span className="w-40 text-center">Thao tác</span>
            </div>
            {productInCart.map((item) => <div key={item.id} className="border-b-2 border-gray-200 py-4"><CartItem onSelect={onSelect} selectedProducts={selectedProducts} onDelete={onDelete} key={item.id} item={item} setTotal={setTotal} total={total}/></div>)}
        </div>
    )
}
