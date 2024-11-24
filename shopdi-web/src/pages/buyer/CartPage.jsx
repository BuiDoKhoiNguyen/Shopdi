import React, { useEffect } from "react";
import { useState } from "react";
import Cart from "../../components/Buyer/Cart.jsx";
import shopdiLogo from "../../assets/images/shopdi_logo.jpeg";
import { Link} from "react-router-dom";
import { DELETE, GET } from "../../api/GET";
export default function CartPage({ CartId }) {
    let l = [];
    useEffect(() => {
        GET("cart").then((res) => {
            if (res.code === "OK") {
                setProductsInCart(res.result.cartItems)
            }
        })
    }, [])
    const [productsInCart, setProductsInCart] = useState([]);
    const onDelete = (id) => {
        DELETE("cart/items/" + id).then((res) => {
            if (res.code === "OK") {
                let l = productsInCart.filter((item) => item.cartItemId !== id);
                setProductsInCart(l);
                alert("Delete successfully")
            }
        })

    }

    const [total, setTotal] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const onSelect = (i) => {
        if (selectedProducts.includes(i)) {
            setSelectedProducts(selectedProducts.filter((item) => item.id !== i.id));
        } else {
            let l = selectedProducts;
            l.push(i);
            setSelectedProducts(l);
        }
    }
    return (
        <>
            <div className="mt-8 ml-32 mr-32">
                <Cart productInCart={productsInCart} selectedProducts={selectedProducts} onSelect={onSelect} setTotal={setTotal} total={total} onDelete={onDelete} />

                <div className="bg-gray-200 h-20 sticky w-full mr-32 bottom-0 p-4 right-0 left-0 mt-8 mb-8 flex flex-row justify-end gap-4">
                    <div className="text-2xl">Total : {total.toLocaleString("vi", { style: "currency", currency: "VND" })}</div>
                    <Link to="/buyer/checkout" onClick={
                        (e) => {
                            if (selectedProducts.length === 0) {
                                e.preventDefault();

                                alert("Please select at least one product");
                            }
                        }
                    } state={{ selectedProducts: selectedProducts }}><button className="bg-red text-white p-2">Checkout</button></Link>
                </div>

            </div>
        </>
    )
}