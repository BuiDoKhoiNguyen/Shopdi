import React from "react";
import { Link } from "react-router-dom";
const ShopBar = ({shop_info}) => {
    return (
        <div className="shop-info bg-white border-2 rounded-md p-4">
                    <div className=" flex flex-row gap-x-4 items-center">
                        <div>
                            <img src={shop_info.image} alt="Logo" className="h-14 w-auto rounded-full" />
                        </div>
                        <div>
                            <div className="text-2xl">{shop_info.name}</div>
                            <Link to={`/shop-view/${shop_info.name}`}><div className='max-w-40 border-2 border-gray-300 bg-white font-publicSans p-2 text-sm'> Xem shop</div></Link>
                        </div>
                        <div>Đánh giá:   <span className='text-pumpkin'>{shop_info.review}</span></div>
                        <div>Sản phẩm:   <span className='text-pumpkin'>{shop_info.san_pham}</span></div>
                        <div>Tham gia:   <span className='text-pumpkin'>{shop_info.tham_gia}</span></div>

                    </div>
                </div>
    )
}

export default ShopBar;