import React, {useState} from "react";
import UETLogo from "/src/assets/images/UETLogo.png";

const sellers_temp = [
    {
        id: 1,
        name: 'Alice',
        avatar: UETLogo,
        status: 'Active',
        products: 10,
        revenue: 1000,
    },
    {
        id: 2,
        name: 'Bob',
        avatar: UETLogo,
        status: 'Blocked',
        products: 5,
        revenue: 500,
    },
    {
        id: 3,
        name: 'Charlie',
        avatar: UETLogo,
        status: 'Active',
        products: 15,
        revenue: 1500,
    },
    {
        id: 4,
        name: 'David',
        avatar: UETLogo,
        status: 'Blocked',
        products: 3,
        revenue: 300,
    },
    {
        id: 5,
        name: 'Eve',
        avatar: UETLogo,
        status: 'Active',
        products: 20,
        revenue: 2000,
    },
    {
        id: 6,
        name: 'Alice',
        avatar: UETLogo,
        status: 'Active',
        products: 10,
        revenue: 1000,
    },
    {
        id: 7,
        name: 'Bob',
        avatar: UETLogo,
        status: 'Blocked',
        products: 5,
        revenue: 500,
    },
    {
        id: 8,
        name: 'Charlie',
        avatar: UETLogo,
        status: 'Active',
        products: 15,
        revenue: 1500,
    },
    {
        id: 9,
        name: 'David',
        avatar: UETLogo,
        status: 'Blocked',
        products: 3,
        revenue: 300,
    },
    {
        id: 10,
        name: 'Eve',
        avatar: UETLogo,
        status: 'Active',
        products: 20,
        revenue: 2000,
    }
];
export default function SellerCard({status}) {
    const [sellers, setSellers] = useState(sellers_temp);
    const [showMenu, setShowMenu] = useState(false);
    const [idCard, setIdCard] = useState(null);

    function handleShowMenu(key) {
        setShowMenu(!showMenu);
        setIdCard(key);
    }
    function onBlock(sellerId) {
        sellers[sellerId - 1].status = 'Blocked';
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-8 py-4 font-sans">
                {(status === 'All' ? sellers : sellers.filter(seller => seller.status === status)).map((seller) => (
                    <div
                        key={seller.id}
                        className="relative bg-white shadow-md rounded-lg p-2 border hover:border-blue-500 transition"
                    >
                        <div className={'relative'}>
                            <input type={'checkbox'}
                                   className='absolute top-0 left-0 w-4 h-4 focus:ring mr-36 md:mr-28 lg:mr-44 rounded-xl text-darkGray'/>
                            <button
                                onClick={() => handleShowMenu(seller.id)}
                                className="w-6 h-6 top-0 right-0 absolute flex items-center justify-center rounded-full hover:bg-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12a.75.75 0 100-1.5.75.75 0 000 1.5zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="w-16 h-16 rounded-full mx-auto"
                        />
                        {/* Popup menu */}
                        {showMenu && idCard === seller.id && (
                            <div
                                className=" absolute right-0 top-10 mt-2 w-32 bg-white border rounded-md shadow-lg"
                                onClick={() => setShowMenu(false)}
                            >
                                <ul>

                                    <li
                                        onClick={() => onBlock(seller.id)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-red-500"
                                    >
                                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.6365 2.72427C14.1697 2.24208 13.5278 1.96882 12.8566 1.96679H2.43904C1.76787 1.9688 1.12601 2.24208 0.659139 2.72427C0.218112 3.17283 -0.0197108 3.78258 0.00128064 4.41126C0.00840499 4.62123 0.0906734 4.82179 0.233026 4.97637C0.375379 5.13109 0.568411 5.22963 0.777048 5.25409L1.28384 16.3393L1.28397 16.3394C1.30131 16.9777 1.56438 17.5846 2.01833 18.0337C2.47228 18.4828 3.08187 18.7394 3.72039 18.75H11.5753C12.2138 18.7394 12.8236 18.4828 13.2775 18.0337C13.7315 17.5846 13.9945 16.9775 14.0119 16.3391L14.5187 5.25395H14.5188C14.7277 5.22935 14.9207 5.13055 15.0631 4.9757C15.2054 4.82071 15.2875 4.62001 15.2945 4.40979C15.3151 3.78149 15.0773 3.17229 14.6367 2.72414L14.6365 2.72427ZM1.49109 3.52745C1.7395 3.27016 2.08133 3.12417 2.43904 3.12283H12.8566C13.2144 3.12417 13.5562 3.27016 13.8046 3.52745C13.9609 3.68647 14.0689 3.88651 14.1162 4.10427H1.17927C1.22659 3.8865 1.33466 3.68647 1.49086 3.52745H1.49109ZM12.8571 16.2865C12.8527 16.6275 12.717 16.9536 12.4783 17.1972C12.2395 17.4407 11.9161 17.5828 11.5754 17.594H3.72045C3.37969 17.5828 3.05626 17.4407 2.81768 17.1972C2.57894 16.9537 2.44331 16.6276 2.43887 16.2867L1.9349 5.26072H13.3611L12.8571 16.2865ZM5.32185 7.11836V15.7372C5.32185 15.9437 5.21163 16.1346 5.03285 16.2378C4.85393 16.3412 4.63349 16.3412 4.45469 16.2378C4.27577 16.1346 4.16555 15.9437 4.16555 15.7372V7.11836C4.16555 6.91175 4.27577 6.72087 4.45469 6.61763C4.63347 6.51439 4.85394 6.51439 5.03285 6.61763C5.21163 6.72087 5.32185 6.91175 5.32185 7.11836ZM8.22617 7.11836V15.7372C8.22617 15.9437 8.11595 16.1346 7.93703 16.2378C7.75825 16.3412 7.53778 16.3412 7.35901 16.2378C7.1801 16.1346 7.06987 15.9437 7.06987 15.7372V7.11836C7.06987 6.91175 7.1801 6.72087 7.35901 6.61763C7.53779 6.51439 7.75826 6.51439 7.93703 6.61763C8.11595 6.72087 8.22617 6.91175 8.22617 7.11836ZM11.1298 7.11836V15.7372C11.1298 15.9437 11.0197 16.1346 10.8408 16.2378C10.6619 16.3412 10.4416 16.3412 10.2627 16.2378C10.0838 16.1346 9.97367 15.9437 9.97367 15.7372V7.11836C9.97367 6.91175 10.0838 6.72087 10.2627 6.61763C10.4416 6.51439 10.6619 6.51439 10.8408 6.61763C11.0197 6.72087 11.1298 6.91175 11.1298 7.11836ZM5.68445 0.828156C5.68445 0.674781 5.74535 0.52772 5.85383 0.419373C5.96217 0.310896 6.10923 0.25 6.26261 0.25H9.03334C9.23995 0.25 9.4307 0.360226 9.53407 0.539142C9.63731 0.717923 9.63731 0.938392 9.53407 1.11716C9.4307 1.29608 9.23996 1.4063 9.03334 1.4063H6.26261C6.10924 1.4063 5.96217 1.34541 5.85383 1.23693C5.74535 1.12859 5.68445 0.981534 5.68445 0.828156Z"
                                                fill="#D0342C"/>
                                        </svg>
                                        <p className="pl-2 text-[#D0342C]">Blocked</p>
                                    </li>
                                    <li
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <svg width="16" height="19" viewBox="0 0 8 9" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.12 9L3.336 4.68L0.276 0.539999H1.428L3.912 3.936L6.372 0.539999H7.536L4.464 4.68L7.68 9H6.516L3.9 5.424L1.296 9H0.12Z"
                                                fill="black"/>
                                        </svg>
                                        <p className={'pl-2'}>Cancel</p>

                                    </li>
                                </ul>
                            </div>
                        )}

                        <h2 className="text-lg font-medium text-center">{seller.name}</h2>
                        <div className={'flex justify-center '}>
                            <div
                                className={`${seller.status === 'Active' ? 'bg-[#3A5BFF] bg-opacity-[12%]' : 'bg-[#F57E77] bg-opacity-[12%]'} w-1/2 rounded-[5px]`}>
                                <p className={`text-center text-sm ${seller.status === 'Active' ? 'text-[#3A5BFF]' : 'text-[#CC5F5F]'}`}>
                                    {seller.status}
                                </p>
                            </div>
                        </div>
                        <div className={'border-b border-dotted border-gray-300 my-2'}></div>
                        <div className="mt-4 text-center text-gray-600 flex justify-around">
                            <p>Product<br/>{seller.products}</p>
                            <p>Revenue<br/> ${seller.revenue}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


}