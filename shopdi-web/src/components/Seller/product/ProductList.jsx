import React from "react";
import Product from "./Product.jsx";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import PaginationButton from "@/components/Navigation/Pagination.jsx";
export default function ProductList({ products }) {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row justify-between pb-4 border-b-2 border-gray-200">
                <div>
                    <input className="w-full h-10 rounded border-2 border-gray-400 outline-none px-4 font-sm" type="text" placeholder="tim kiem san pham"></input>
                </div>
                <div className="w-fit">
                    <Link to='add-product'>
                        <button className="w-full h-10 rounded text-white bg-celticBlue outline-none px-4 ">
                            <AddIcon />Them san pham</button>
                    </Link>
                </div>
            </div>
            <div className="header flex flex-row w-full mb-4">
                <span className="grow pl-12">Ten san pham</span>
                <span className="w-32 text-center">Gia</span>
                <span className="w-32 text-center">Trong kho</span>
                <span className="w-32 text-center">Dat hang</span>
                <span className="w-32 text-center">Ngay dang</span>
                <span className="w-16 text-center">Thao tac</span>
            </div>

            {products && products.map((product) => <div key={product.productId}>
                <Product product={product} />
            </div>)}
            <div className="flex flex-row justify-center absolute bottom-4 left-1/2">
                <PaginationButton />
            </div>
        </div>
    )
}
const generatePagination = (currentPage, totalPages) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};
