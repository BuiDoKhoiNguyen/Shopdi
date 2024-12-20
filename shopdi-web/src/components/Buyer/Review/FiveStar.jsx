import React, {useState} from "react";

const StarRating = ({review, setReview}) => {
    const [rating, setRating] = useState(0); // Lưu số ngôi sao được đánh giá

    // Hàm thay đổi số ngôi sao khi nhấp vào
    const handleRating = (index) => {
        setRating(index + 1); // index bắt đầu từ 0, nên cần +1 để đúng số ngôi sao
        setReview({...review, rating: index + 1}); // Cập nhật lại số ngôi sao trong review
    };

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    onClick={() => handleRating(index)}
                    className={`w-3 h-3 md:w-5 md:h-5 cursor-pointer ${
                        index < rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                </svg>

            ))}
            <p className="pl-2 ms-1 text-[14px] md:text-[16px] font-medium text-gray-500 dark:text-gray-400">{rating} Star
                Rating</p>
        </div>

    );
};

export default StarRating;
