import React from 'react'
import { useState } from 'react'
import { GET, POST } from '../../api/GET'
import { useNavigate } from 'react-router-dom'
const SellerSignUp = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [form, setForm] = useState({

        "shopName": "string",
        "address": "string",
        "stateOrDistrict": "string",
        "cityOrTown": "string",
        "email": "string",
        "contactNumber": "0794451178",
        "additionalContactInfo": "string"

    })
    const signUp = (e) => {
        e.preventDefault();
        POST(`seller/register`, form).then((res) => {
            console.log(res)
            if (res.code === 'OK') {
                localStorage.clear()
                navigate("/login")
            }else {
                setMessage(res.message)
            }
        })
    }
    return (
        <>
            {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-0 py-5 lg:px-8 border-8 mx-96 my-20">
                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 font-size ">
                        Get your bussiness started
                    </h2>
                    <p className="mt-2 text-left text-sm text-gray-500">
                        Fill in your shop's details to create an account
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="shopName" className="block text-sm font-medium leading-6 text-gray-900">
                                Shop name / Business name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "shopName": e.target.value
                                        })
                                    }}
                                    id="shopName"
                                    name="shopName"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="shopName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "email": e.target.value
                                        })
                                    }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "additionalContactInfo": e.target.value
                                        })
                                    }}
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="additionalContactInfo" className="block text-sm font-medium leading-6 text-gray-900">
                                Additional contact info
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "additionalContactInfo": e.target.value
                                        })
                                    }}
                                    id="additionalContactInfo"
                                    name="additionalContactInfo"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="additionalContactInfo"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cityOrTown" className="block text-sm font-medium leading-6 text-gray-900">
                                City or Town
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "cityOrTown": e.target.value
                                        })
                                    }}
                                    id="cityOrTown"
                                    name="cityOrTown"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="cityOrTown"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="stateOrDistrict" className="block text-sm font-medium leading-6 text-gray-900">
                                State or District
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "stateOrDistrict": e.target.value
                                        })
                                    }}
                                    id="stateOrDistrict"
                                    name="stateOrDistrict"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="stateOrDistrict"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            "contactNumber": e.target.value
                                        })
                                    }}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="phoneNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={signUp}
                                type="submit"
                                tabIndex={3}
                                className="flex w-full justify-center rounded-md bg-yaleBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 mb-20 text-left text-sm text-red">
                        {message}
                    </p>
                    <p className="mt-10 mb-20 text-left text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SellerSignUp