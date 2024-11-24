import React from "react";
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {Link} from 'react-router-dom';
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
export default function Product({product}) {
    let stars = [];
    for (let i = 0; i < Math.round(product.rating); i++) {
        stars.push(<StarIcon key={i} style={{color: "yellow", fontSize: "15px"}}/>)
    }
    for (let i = 0; i < 5 - Math.round(product.rating); i++) {
        stars.push(<StarIcon key={5 - i} style={{color: "white", fontSize: "15px"}}/>)
    }
    return (
        <Link to={`/product/${product.productId}`}>
            <div className="bg-cloudBlue p-2 w-60 h-96 rounded-md ">
                <div className="h-full rounded-md flex flex-col space-y-2">
                    <div className=" bg-white min-w-full h-[224px] ">
                        <img src={product.imageUrls} width={224}  alt={product.name}/>
                    </div>
                    <div className="text-lg grow p-2">
                        <p>{product.productName}</p>
                    </div>
                    <div>
                        {stars}
                    </div>
                    <div>
                        <p><AttachMoneyIcon style={{fontSize: "15px"}}/>{product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
