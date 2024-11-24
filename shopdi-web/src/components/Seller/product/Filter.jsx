import React, { useState } from "react";
import PaginationButton from "@/components/Navigation/Pagination";
import CATEGORIES from '@/data/categories_data';
const categories = CATEGORIES.CATEGORIES

export default function Filter({ children, products }) {

    let currentCategory = "Danh muc";
    let sub_categories = ["May tinh", "Dien thoai", "linh kien"];
    return (
        <div className="bg-white grow">
            <main className="mx-auto  px-4 sm:px-6 lg:px-8">

                {/* cac loai bo loc */}

                <section aria-labelledby="products-heading" className="pt-6">
                    <h2 id="products-heading" className="sr-only">Products</h2>

                    <div className="flex flex-row w-full">
                        {/* <!-- Filters --> */}
                        <form className="hidden lg:block w-1/4 border-r border-gray-200 max-h-screen ">
                            <FilterSection type={currentCategory} values={sub_categories} />
                            <FilterSection type="Brand" values={["Apple", "Samsung", "Google", "Sony"]} />
                            <PriceFilter />
                            <FilterSection type="Rating" values={["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"]} />
                        </form>

                        {/* <!-- Product grid --> */}
                        <div className="w-3/4 p-4">
                            <div>{children}</div>
                        </div>
                    </div>

                </section>
            </main>

        </div>

    )


}
function PriceFilter() {
    let [isOpen, setIsOpen] = useState(false);
    const set = (value) => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">Price</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {isOpen &&
                (<div className="pt-6" id="filter-section-1">
                    <div className="text-center">
                        <input onKeyDown={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} className="w-24 border-red border-2" />
                        <span> to </span>
                        <input onKeyDown={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} className="w-24 border-red border-2" />
                    </div>
                    <div className="text-center mt-4">
                        <button className="border-red border-2 rounded-md w-24">Apply</button>
                    </div>
                </div>)
            }
        </div>
    )
}
function FilterSection({ type, values }) {
    let [isOpen, setIsOpen] = useState(false);
    const set = (value) => {
        setIsOpen(!isOpen);
        console.log(isOpen)

    }

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">{type}</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {isOpen &&
                (<div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                        {values.map((item, index) =>
                            <div key={item} className="flex items-center">
                                <input id={`${index}`} name={item} value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor={`${index}`} className="ml-3 text-sm text-gray-600">{item}</label>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}
