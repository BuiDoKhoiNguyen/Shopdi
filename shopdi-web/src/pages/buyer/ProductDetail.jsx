import Quantity from "../../components/Buyer/Quantity.jsx";
import Variant from "../../components/Buyer/Variant.jsx";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import ShopBar from "../../components/Buyer/ShopBar.jsx";
import { GET, POST } from "@/api/GET";
export default function ProductDetail() {
    const location = useLocation();
    let t = location.pathname.split("/")
    const id = t[t.length - 1]
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({})
    useEffect(() => {
        GET(`products/${id}`).then((data) => {
            for (let i = 0; i < data.result.variants.length; i++) {
                data.result.variants[i].variantDetail = JSON.parse(data.result.variants[i].variantDetail)
            }
            setProduct(data.result)

            if (data.result.variants.length > 0) {
                let v = []
                for (let i = 0; i < data.result.variants[0].variantDetail.length; i++) {
                    v.push({ type: data.result.variants[0].variantDetail[i].type, value: null })
                }
                setCurrentSelectedVariant(v)
            }else{
                setIsBuyNowWithoutAttribute(false)
            }
            setIsLoading(false)

        })
    }, [])
    const shop_info = {
        name: "Shopdi",
        link: "https://shopdi.com",
        image: shopdiLogo,
        review: "3,1tr",
        "san_pham": "100",
        "tham_gia": " 2 năm trước"
    }

    const [quantity, setQuantity] = useState(1);
    const [currentSelectedVariant, setCurrentSelectedVariant] = useState([]);

    const [isBuyNowWithoutAttribute, setIsBuyNowWithoutAttribute] = useState(true);
    const [quantityInStock, setQuantityInStock] = useState(0)
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
        POST(`cart/add-item`, {
            productId: product.productId,
            "variant": JSON.stringify(currentSelectedVariant),
            "quantity": quantity,
            "price": product.price,
            "discountPercent": 0,
            "discountedPrice": 0
        }).then((data) => {
            if (data.code == "OK") {
                alert("Add to cart successfully")
            }
        })
    }
    const handleBuyNow = () => {
        console.log(isBuyNowWithoutAttribute)
        if (isBuyNowWithoutAttribute) {
            document.getElementsByClassName('message')[0].innerHTML = "Please select attributes"
            return
        }
        if (product.variants.length === 0 && product.quantity === 0) {
            alert("Product is out of stock")
            return
        } else if (product.variants.length > 0 && currentSelectedVariant.length === 0) {
            alert("Product is out of stock")

        } else {
            // console.log(currentSelectedVariant)
        }
    }
    const product_subImages = ["link-main-image", "link-image-1", "link-image-2", "link-image-3", "link-image-4", "link-image-5", "link-image-6", "link-image-7", "link-image-8", "link-image-9", "link-image-10"]
    const [subImages, setSubImages] = useState([0, 1, 2, 3, 4])
    const [curImage, setCurImage] = useState(0)
    if (!isLoading) {
        return (
            <div className="pr-40 pl-40 bg-cloudBlue font-sans">
                <div className="pt-10 flex flex-col gap-y-2">
                    <div className="product-info bg-white flex flex-row gap-x-8 border-2 rounded-md">
                        <div className="product-image w-2/5 p-2">
                            <div className=" main-image w-full min-h-96 bg-red">
                                <img src="#" alt={`image ${curImage}`} className="w-100 h-100" />
                            </div>
                            <div className="sub-image w-full min-h-12 bg-white flex flex-row gap-x-2 mt-2">
                                <button onClick={() => {
                                    if (subImages[0] === 0) return
                                    let tmp = subImages.map((i) => i - 1)
                                    setSubImages(tmp)
                                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                </button>
                                {subImages.map((i) => <div className="w-16 h-16 stretch bg-green" key={i} onClick={() => setCurImage(i)}><img src="#" alt={`image ${i}`} /></div>)}
                                <button onClick={() => {
                                    if (subImages[4] === product_subImages.length - 1) return
                                    let tmp = subImages.map((i) => i + 1)
                                    setSubImages(tmp)
                                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="product-description flex flex-col gap-y-4">
                            <div className="text-2xl text-wrap">
                                <p>{product.productName}</p>
                            </div>
                            <div className="flex flex-row gap-x-5">
                                <div className='border-r-2 pr-4 border-grey'>
                                    {[1, 2, 3, 4, 5].map((i) => i < Math.round(product.rating) ? <StarIcon key={i} style={{ color: "yellow", fontSize: "20px" }} /> : <StarIcon key={i} style={{ color: "grey", fontSize: "20px" }} />)}
                                </div>
                                <div className='border-r-2 pr-4 border-grey'>
                                    {1000} đánh giá
                                </div>
                                <div>
                                    {1000} đã bán
                                </div>
                            </div>
                            <div>
                                <span className='text-4xl'>&#8363; {product.price.toLocaleString()}</span>
                            </div>
                            <Variant variantWithQuantity={product.variants} onChangeCurrentSelectedVariant={onChangeCurrentSelectedVariant} currenSelectedVariant={currentSelectedVariant} />
                            <div className='flex flex-row'>
                                <div className='text-base align-middle text-gray-600 min-w-20 text-left'>So luong</div>
                                <div className='flex flex-row flex-wrap'>
                                    <Quantity quantity={quantity} setQuantity={setQuantity} quantityInStock={quantityInStock} />
                                    <div className='ml-4'> Còn lại {isBuyNowWithoutAttribute ? product.quantity : quantityInStock} sản phẩm </div>
                                </div>
                            </div>
                            {isBuyNowWithoutAttribute ? <div className='text-red message'></div> : null}
                            <div className='flex flex-row ml-4'>
                                <button className='bg-pumpkin font-publicSans text-white rounded-sm cursor-pointer border-2 p-2' onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                                <button className='ml-2 bg-white font-publicSans text-pumpkin rounded-sm cursor-pointer  border-pumpkin  p-2 border-2' onClick={handleBuyNow}>Mua ngay</button>
                            </div>
                        </div>
                    </div>
                    <ShopBar shop_info={shop_info} />
                    <div className="description bg-white flex flex-col gap-x-8 border-2 rounded-md p-4">
                        <div className="text-2xl">
                            <h2>Mô tả</h2>
                        </div>
                        <div className="font-publicSans white-space-pre">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


