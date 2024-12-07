import { Popover, PopoverButton, PopoverGroup, PopoverPanel, } from '@headlessui/react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import shopdiLogo from '@/assets/images/Shopdi2.jpg';
import AccountMenu from './AccountMenu/AccountMenu.jsx';
import CATEGORIES from '@/data/categories_data';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthProvider.jsx';
import { useContext, useEffect, useState } from 'react';
import {CategoryContext} from '../../pages/buyer/CategoryContext';
import { GET } from '../../api/GET.jsx';
export default function Navigation(props) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        GET("categories").then((res) => {
            if (res.code === "OK") {
                setCategories(res.result)
                setIsLoading(false)
            }
        });
        JSON.parse(localStorage.getItem('roles')).find(role => role.name === 'ADMIN') ? setIsAdmin(true) : setIsAdmin(false);
    }, []);
    if(isLoading){
        return <div className="text-center">Loading...</div>
    }
    const handleSearch = (e) => {
        if(e.key === 'Enter'){
            navigate(`http://localhost:5173/search?query=${e.target.value}`)
        }
    }
    return (
        <div className={`font-sans`}>
            <div className={'bg-yaleBlue text-yaleBlue text-[18px]'}>
                header
            </div>
            <div className="bg-white">
                <header className="relative">
                    <nav aria-label="Top" className=" max-w-7xl lg:px-8">
                        <div className=" border-gray-200">
                            <div className="flex h-16 items-center">

                                {/* Logo */}
                                <div className=" flex ml-0 mr-2 lg:ml-6">
                                    <a href="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            alt="Logo"
                                            src={shopdiLogo}
                                            className="h-[50px] w-[50px] md:h-14 md:w-auto"
                                        />
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <PopoverGroup className="hidden sm:ml-8 sm:block sm:self-stretch z-10">
                                    <div className="flex h-full space-x-8">
                                        <Popover className="flex">
                                            <div className="relative flex">
                                                <PopoverButton
                                                    className="relative z-10 -mb-px outline-none flex items-center border-b-2  border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                                                    Categories
                                                    <svg
                                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                        data-slot="icon">
                                                        <path fillRule="evenodd"
                                                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                </PopoverButton>
                                            </div>


                                            <PopoverPanel
                                                transition
                                                className="border-b shadow-lg border-gray-200 absolute z-15 inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {/* <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" /> */}

                                                <div className="relative bg-white z-14">
                                                    <div className="mx-auto max-w-7xl px-8">
                                                        <div className="inset-y-0 grid gap-x-8 gap-y-10 py-16">

                                                            <div
                                                                className="row-start-1 grid grid-cols-6 gap-x-8 gap-y-10 text-sm">
                                                                {categories.map((section) => (
                                                                    <a key={section.name} href={`/category/${section.categoryId}`}
                                                                        >
                                                                        <div key={section.name}>
                                                                            <p id={`${section.name}-heading`}
                                                                                className="font-medium hover:text-indigo-600">
                                                                                {section.name}
                                                                                
                                                                            </p>
                                                                        </div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>

                                        {!isAdmin ? (<button
                                            onClick={() => window.open(`${process.env.PREFIX_URL}/seller`, '_blank')}
                                            className="flex items-center text-[12px] text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            Become a Seller
                                        </button>) : (
                                            <button
                                                onClick={() => window.open('http://localhost:5173/admin', '_blank')}
                                                className="flex items-center text-[12px] text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Admin page
                                            </button>)}

                                    </div>
                                </PopoverGroup>

                                {/* Search */}
                                <div
                                    className="flex ml-0 lg:ml-6 border border-gray-200 rounded-xl w-[50%] md:w-[40%] h-1/2 mx-2 shadow-md">
                                    <a href="#" className=" py-2 pl-1 md:px-1 md:py-[6px] text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4 md:h-6 md:w-6" />
                                    </a>
                                    <input
                                        type="text"
                                        className="p-2 w-full outline-none rounded-xl"
                                        placeholder="Search..."
                                        onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?query=${e.target.value}`)}
                                    />
                                </div>

                                <div className="ml-1  md:ml-auto flex items-center">
                                    <a href='#' className="hidden md:flex text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Support
                                    </a>
                                    <AccountMenu />
                                    {/* <ModeSelect />*/}
                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Link to="cart" className="group -m-2 flex items-center md:p-2">
                                            <ShoppingBagIcon
                                                aria-hidden="true"
                                                className=" md:w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-500"
                                            />
                                            <span id="cart-quantity"
                                                className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"></span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}
