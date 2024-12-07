import React from 'react'

const ForgetPassword = () => {
    return (
        <>
            {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-left text-[2.9rem] font-bold leading-9 tracking-tight text-gray-900 font-size ">
                        Forget password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
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
                            <button
                                type="submit"
                                tabIndex={3}
                                className="flex w-full justify-center rounded-md bg-yaleBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send code
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-left text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Sign in
                        </a>
                    </p>
                    <p className="mt-2 mb-20 text-left text-sm text-gray-500">
                        Haven't an account yet?{' '}
                        <a href="/buyer/signup" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword