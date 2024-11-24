import React from 'react';
import {Textarea} from "@headlessui/react";
import FiveStar from '../../components/Buyer/Review/FiveStar.jsx'

function Review() {
    return (
        <div className='h-56 w-60 md:h-full md:w-[400px] mx-auto mb-2 border-2 border-[#E4E7E9] rounded bg-white font-sans'>
            <div className='flex items-center justify-between border-2 border-[#E4E7E9] rounded p-2 m-2'>
                <h1 className='text-[14px] md:text-[16px] font-sans'>BILLING ADDRESS</h1>
            </div>
            <div className='h-4/6 m-1 md:m-2 text-[14px]'>
                <div>
                    <h2 className='text-[14px] font-bold'>Rating</h2>
                    <div className="flex items-center mb-1 md:mb-5">
                        <FiveStar/>
                    </div>

                    <h2 className='text-[14px] font-bold font-sans'>Feedback</h2>
                    <div className='border-2 border-[#E4E7E9] mb-4'>
                        <Textarea className='w-full h-14 md:h-28'
                                  placeholder={"Write down your feedback about our product & services"}></Textarea>
                    </div>
                </div>
                <div className='flex justify-around  mx-auto'>
                    <button className='bg-[#FA8232] rounded-sm text-white h-6 w-24 md:w-28 md:h-8 text-[14px] p-1 md:p-2 font-bold font-sans hover:bg-orangeRed'>
                        PUBLISH REVIEW
                    </button>
                    <button className='bg-[#FA8232] rounded-sm text-white h-6 w-24 md:w-28 md:h-8 text-[14px] p-1 md:p-2 font-bold font-sans hover:bg-orangeRed'>
                        REVIEW LATER
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Review;