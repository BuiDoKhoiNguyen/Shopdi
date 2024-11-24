import { useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import {useEffect, useState} from "react";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import { GET } from "../../../api/GET";
import { JSONToData } from "@/utils/todo";
export default function ProductDetail() {
    const location = useLocation();
    let t = location.pathname.split("/")
    const id = t[t.length - 1]
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({})
    useEffect(() => {
        GET(`products/${id}`).then((data) => {
            setIsLoading(false)
            setProduct(data.result)
            console.log(data.result)
        })
    }, [])
    const shop_info = {
        name: "Shopdi",
        link: "https://shopdi.com",
        image: shopdiLogo,
        review: "3,1tr",
        "san_pham": "100",
        "tham_gia": " 2 nam truoc"
    }
    
    const [quantity, setQuantity] = useState(1);
    const product_subImages = ["link-main-image", "link-image-1", "link-image-2", "link-image-3", "link-image-4", "link-image-5", "link-image-6", "link-image-7", "link-image-8", "link-image-9", "link-image-10"]
    const [subImages, setSubImages] = useState([0, 1, 2, 3, 4])
    const [curImage, setCurImage] = useState(0)
    if(!isLoading)return (
        <div className="pr-10 pl-10 bg-cloudBlue grow">
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
                                {1000} danh gia
                            </div>
                            <div>
                                {1000} da ban
                            </div>
                        </div>
                        <div>
                            <span className='text-4xl'>&#8363; {product.price}</span>
                        </div>
                        
                        {product.variants.map((variant) => (
                            <div key={variant.variantDetail}>
                                <span>{JSONToData(variant.variantDetail)}</span>
                                <span> : </span>
                                <span>{variant.quantity}</span>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className="description bg-white flex flex-col gap-x-8 border-2 rounded-md p-4">
                    <div className="text-2xl">
                        <pre>Mo ta</pre>
                    </div>
                    <div className="font-publicSans white-space-pre">
                        {product.description}
                    </div>
                </div>
            </div>
        </div >
    )
}


