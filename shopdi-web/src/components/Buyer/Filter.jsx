import React, { useEffect, useState, useContext } from "react";
import ProductList from "./ProductList.jsx";
import { useLocation } from "react-router-dom";
import CATEGORIES from '@/data/categories_data';
import { GET } from '../../api/GET'
import { Link } from "react-router-dom";
import { CategoryContext } from "@/pages/buyer/CategoryContext.js";
const categories = CATEGORIES.CATEGORIES

export default function Filter({ children, products, setProducts }) {
    const location = useLocation();
    const currentCategory = decodeURIComponent(location.pathname.split("/")[1]);

    const [loading, setLoading] = useState(true);
    const [sub_categories, setSubCategories] = useState([])
    const buildUrl = (name, value, isCategory = false, checked = true) => {
        // console.log(name, value, isCategory, checked)
        if (isCategory) {
            // console.log(`/${value}` + location.search)
            return `/${value}` + location.search
        }
        const params = new URLSearchParams(location.search);
        // console.log(params)
        if (params.has(name)) {
            // console.log(params)
            params.set(name, encodeURI(value))
            // console.log(location.pathname + `?${params.toString()}`)
            return location.pathname + `?${params.toString()}`
        }
        if (location.search === '') {
            return location.pathname + `?${name}=${encodeURI(value)}`
        } else {
            return location.pathname + `${location.search}&${name}=${encodeURI(value)}`
        }
    }
    const isValidCategory = (category) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === category) {
                return true
            }
        }
        return false
    }
    useEffect(() => {
        GET(`categories/child/${currentCategory}`).then((res) => {
            if (res.code === "OK") {
                // console.log(res)
                setSubCategories(res.result.map((item) => item.name))
                setLoading(false)
            } else {
                // console.log(res)
                setLoading(false)
            }
        })
    }, [])
    if (!loading) {
        const category = categories.find((category) => category.name === currentCategory);
        return (
            <div className="bg-white">
                <main className="mx-auto max-width-20 px-4 sm:px-6 lg:px-8">


                    {/* cac loai bo loc */}

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className=" min-h-screen">
                            {/* <!-- Filters --> */}
                            <form className="hidden lg:block">
                                {/* <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {category.sub_categories.map(item => <li key={item}><a href="#">{item}</a></li>)}
                                </ul> */}
                                <FilterSection location={location} type={currentCategory} values={sub_categories} buildUrl={(value) => { return buildUrl("category", value, true, false) }} />
                                <FilterSection location={location} type="brand" values={["Apple", "Samsung", "Google", "Sony"]} buildUrl={(value) => { return buildUrl("brand", value, false, false) }} />
                                <PriceFilter />
                                <FilterSection location={location} type="rating" values={["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"]} buildUrl={(value) => { return buildUrl("rating", value, false, false) }} />
                            </form>

                            {/* <!-- Product grid --> */}

                        </div>
                    </section>
                </main>

            </div>

        )
    }
    else {
        return (
            <div>
                <h1>Not Found</h1>
            </div>
        )
    }
}
function PriceFilter() {
    let [isOpen, setIsOpen] = useState(true);
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
function FilterSection({ type, values, buildUrl,location }) {
    const cate = decodeURIComponent(location.pathname.split("/")[1])
    const params = new URLSearchParams(location.search);
    console.log(cate)
    let [isOpen, setIsOpen] = useState(true);
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
                                <Link to={buildUrl(item)}>
                                    <input id={`${index}`}
                                        checked={params.get(type) === item || cate === item}
                                        name={type} value={item} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor={`${index}`} className="ml-3 text-sm text-gray-600">{item}</label>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}
