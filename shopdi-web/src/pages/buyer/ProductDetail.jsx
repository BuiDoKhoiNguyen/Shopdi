import Quantity from "../../components/Buyer/Quantity.jsx";
import Variant from "../../components/Buyer/Variant.jsx";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import ShopBar from "../../components/Buyer/ShopBar.jsx";
import { GET, POST } from "@/api/GET";
import Comments from "../../components/Buyer/Review/Comments.jsx";
import CartItem from "../../components/Buyer/CartItem.jsx";
export default function ProductDetail() {
    const location = useLocation();
    let t = location.pathname.split("/")
    const id = t[t.length - 1]
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [review, setReview] = useState({})
    useEffect(() => {
        GET(`products/${id}`).then((data) => {
            let tmp_quantityInStock = 0
            for (let i = 0; i < data.result.variants.length; i++) {
                data.result.variants[i].variantDetail = JSON.parse(data.result.variants[i].variantDetail)
                tmp_quantityInStock += data.result.variants[i].quantity
            }
            setProduct(data.result)
            setProductImages(data.result.imageUrls)
            setQuantityInStock(tmp_quantityInStock)
            setPriceOfVariant(data.result.price)
            if (data.result.variants.length > 0 && data.result.variants[0].variantDetail !== null) {
                let v = []
                for (let i = 0; i < data.result.variants[0].variantDetail.length; i++) {
                    v.push({ type: data.result.variants[0].variantDetail[i].type, value: null })
                }
                setCurrentSelectedVariant(v)
            } else {
                setIsBuyNowWithoutAttribute(false)
            }
            getReview(id).then((res) => {
                setReview(res)
                setIsLoading(false)
            })
        })

    }, [isLoading])

    const [quantity, setQuantity] = useState(1);
    const [currentSelectedVariant, setCurrentSelectedVariant] = useState([]);
    const [isBuyNowWithoutAttribute, setIsBuyNowWithoutAttribute] = useState(true);
    const [quantityInStock, setQuantityInStock] = useState(0)
    const [priceOfVariant, setPriceOfVariant] = useState(0)
    const [productImages, setProductImages] = useState([])
    const [subImages, setSubImages] = useState([0, 1, 2, 3, 4])
    const [curImage, setCurImage] = useState(0)
    const onChangeCurrentSelectedVariant = (type, value) => {

        let tmp = []
        for (let i = 0; i < currentSelectedVariant.length; i++) {
            tmp.push({ type: currentSelectedVariant[i].type, value: currentSelectedVariant[i].value })
        }
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].type === type) {
                tmp[i].value = value
                setCurrentSelectedVariant(tmp)
                for (let j = 0; j < product.variants.length; j++) {
                    if (JSON.stringify(product.variants[j].variantDetail) === JSON.stringify(tmp)) {
                        setQuantityInStock(product.variants[j].quantity)
                        setPriceOfVariant(product.variants[j].price)
                    }
                }
            }
        }
        if (tmp.find((i) => i.value === null) === undefined) {
            setIsBuyNowWithoutAttribute(false)
        }
        console.log(tmp)
    }
    const handleAddToCart = () => {
        if (isBuyNowWithoutAttribute) {
            document.getElementsByClassName('message')[0].innerHTML = "Please select attributes"
            return
        }
        if (quantity > quantityInStock) {
            alert("Product is out of stock")
            return
        }
        POST(`cart/add-item`, {
            productId: product.productId,
            "variant": JSON.stringify(currentSelectedVariant),
            "quantity": quantity,
            "price": priceOfVariant,
            "discountPercent": 0,
            "discountedPrice": 0
        }).then((data) => {
            if (data.code == "OK") {
                alert("Add to cart successfully")
            }
        })
    }
    const navigate = useNavigate();
    const handleBuyNow = () => {
        console.log(isBuyNowWithoutAttribute)
        if (isBuyNowWithoutAttribute) {
            document.getElementsByClassName('message')[0].innerHTML = "Please select attributes"
            return
        }
        if (quantity > quantityInStock) {
            alert("Product is out of stock")
            return
        }
        navigate("/buyer/checkout", {
            state: {
                isBuyNow: true,
                selectedProducts: [
                    {
                        sellerId: product.seller.sellerId,
                        sellerName: product.seller.shopName,
                        cartItems: [
                            {
                                "sellerId": product.seller.sellerId,
                                "sellerName": product.seller.shopName,
                                "cartItemId": 16,
                                "productId": product.productId,
                                "productName": product.productName,
                                "productImage": productImages[0],
                                "variant": JSON.stringify(currentSelectedVariant),
                                "quantity": quantity,
                                "price": priceOfVariant,
                                isSelected : true
                            }
                        ]
                    }
                ]
            }
        })
    }

    if (!isLoading) {
        return (
            <div className="px-40 bg-cloudBlue font-sans">
                <div className="pt-12 flex flex-col gap-y-6">
                    <div className="product-info bg-white flex flex-row gap-x-8 border-[1px]">
                        <div className="product-image w-2/5 p-8">
                            <div className=" main-image w-full min-h-96">
                                <img src={productImages[curImage]} alt={`image ${curImage}`} className="w-full h-full rounded-md border-2" style={{ aspectRatio: "1/1" }} />
                            </div>
                            <div className="sub-image w-full min-h-12 bg-white flex flex-row gap-x-2 mt-6">
                                <button onClick={() => {
                                    if (subImages[0] === 0) return
                                    let tmp = subImages.map((i) => i - 1)
                                    setSubImages(tmp)
                                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                </button>
                                {subImages.map((i) => <div className="w-16 h-16 stretch " key={i} onClick={() => setCurImage(i)}><img src={productImages[i]} className={`rounded-lg`} style={{ aspectRatio: "1/1" }} alt={`image ${i}`} /></div>)}
                                <button onClick={() => {
                                    if (subImages[4] === productImages.length - 1) return
                                    let tmp = subImages.map((i) => i + 1)
                                    setSubImages(tmp)
                                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="product-description flex flex-col gap-y-4">
                            <div className="mt-12 text-3xl text-wrap mr-16">
                                <p>{product.productName}</p>
                            </div>

                            <div>
                                <span
                                    className='text-[26px] text-[#2DA5F3] mt-2'> {priceOfVariant.toLocaleString()} &#8363;</span>
                            </div>
                            <Variant variantWithQuantity={product.variants}
                                onChangeCurrentSelectedVariant={onChangeCurrentSelectedVariant}
                                currenSelectedVariant={currentSelectedVariant} />
                            <div className='flex flex-row mt-4'>
                                <div className='text-base align-middle text-gray-600 min-w-20 text-left'>Quantity</div>
                                <div className='flex flex-row flex-wrap'>
                                    <Quantity quantity={quantity} setQuantity={setQuantity}
                                        quantityInStock={quantityInStock} />
                                    <div className='ml-6'> {quantityInStock} products remain</div>
                                </div>
                            </div>
                            {isBuyNowWithoutAttribute ? <div className='text-red message'></div> : null}
                            <div className='flex flex-row mt-2'>
                                <button className='bg-[#FA8232] font-sans text-white rounded cursor-pointer px-4 hover:bg-orangeRed font-semibold'
                                    onClick={handleAddToCart}>Add to cart
                                </button>
                                <button
                                    className='ml-6 bg-white font-sans text-[#FA8232] rounded cursor-pointer  border-[#FA8232]  p-2 px-4 border-2 font-semibold hover:bg-orangeRed hover:text-white hover:border-orangeRed'
                                    onClick={handleBuyNow}>Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                    <ShopBar sellerId={product.seller.sellerId} />
                    <div className="description  bg-white flex flex-col gap-x-8 border-[1px] py-6 px-8">
                        <div className="text-[28px] mb-4 font-semibold font-sans text-yaleBlue border-b-2 pb-4">
                            <h2>Description</h2>
                        </div>
                        <div>
                            <p className="font-publicSans white-space-pre" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br>") }}></p>
                        </div>
                    </div>
                    <div className="description bg-white flex flex-row gap-x-8 border-[1px] py-6 px-8 mb-12">
                        <div className="w-full">
                            <div className="text-[28px] mb-4 font-semibold font-sans text-yaleBlue border-b-2 pb-4">
                                <h2>Comment</h2>
                            </div>
                            <div className="font-sans white-space-pre">
                                <Comments productId={product.productId} />
                            </div>
                        </div>
                        <div className="w-1/4">
                            <button>

                            </button>
                            <div className="flex flex-col gap-y-2 items-center">
                                <div className=''>
                                    {[1, 2, 3, 4, 5].map((i) => i <= Math.round(review.rating) ? <StarIcon key={i} style={{ color: "yellow", fontSize: "30px" }} /> : <StarIcon key={i} style={{ color: "grey", fontSize: "30px" }} />)}
                                </div>
                                <div className=' text-xl font-semibold'>
                                    {review.count} Reviews
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}
const getReview = async (productId) => {
    const count = await GET(`reviews/product/${productId}/count`).then((res) => {
        if (res.code === "OK") {
            return res.result
        }
    })
    const rating = await GET(`reviews/product/${productId}/average-rating`).then((res) => {
        if (res.code === "OK") {
            return res.result
        }
    })
    return { count, rating }
}


