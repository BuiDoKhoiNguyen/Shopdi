import React from "react";
import Product from "./Product.jsx";
import Pagination from "@/components/Navigation/Pagination.jsx";
import { useState } from "react";
export default function ProductList({ products }) {
    const [isSortOpen, setSortOpen] = useState(false);

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            {/* <div className="flex items-center justify-end mr-0">
                <div className=" inline-block text-left">
                    <div>
                        <button type="button" onClick={() => setSortOpen(!isSortOpen)} className="hs-dropdown-toggle group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="menu" aria-label="Dropdown">
                            Sort<svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div id="sort-menu" role="menu" className={`absolute ${isSortOpen ? 'block' : 'hidden'} right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`} aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" >
                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">Most Popular</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-1">Best Rating</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-2">Newest</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-3">Price: Low to High</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-4">Price: High to Low</a>
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
            </div> */}

            <div className="self-center inline-grid grid-cols-4 gap-x-1 gap-y-1 font-sans min-h-screen">
                {products.map(product => <Product key={product.productId + product.productName} product={product} />)}
            </div>
            <Pagination />
        </div >
    )
}