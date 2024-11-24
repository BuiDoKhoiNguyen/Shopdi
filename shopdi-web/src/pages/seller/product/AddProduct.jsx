import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { POST,GET } from '@/api/GET';
import { JSONToData } from '@/utils/todo';
export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GET("categories").then((res) => {
            if (res.code === "OK") {
                setCategories(res.result)
                setCurrentCategory({parent: res.result[0].name, child: res.result[0].childCategories[0].name})
                setLoading(false)
                setProductForm({ ...productForm, categoryName: res.result[0].childCategories[0].name })
            }
        })
    },[])
    const [productForm, setProductForm] = useState({
        productName: '',
        description: '',

        // Media
        imageUrls: [],

        // Pricing
        price: 0,
        discountPercent: 0,

        brand: '',

        // Variant
        variantDetails: [],
        quantity: 0,

        // Category and Tags
        categoryName: 'dcm',
        tagNames: [],

        // Status
        productStatus: 'PUBLISHED',
    })
    const [currentCategory, setCurrentCategory] = useState({parent: '', child: ''});
    const [variants, setVariants] = useState([]);

    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    if (!loading) return (
        <div className='w-full flex flex-row'>
            <div className={`${openPopup ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}><QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} productForm={productForm} setProductForm={setProductForm} /></div>
            <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

            <div className={`add-product p-8 w-4/6 flex flex-col gap-4 m-auto bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}>

                <div>
                    <span className='text-celticBlue text-xl hover:text-black cursor-pointers h-10' onClick={() => window.history.back()}><ArrowBackIcon style={{ fontSize: '40px' }} /></span>
                    <span className="inline-block font-bold text-xl ml-4 p-2">Add Product</span>
                    <span onClick={() => {
                        const allInput = document.querySelectorAll('.required-field');
                        for (let i = 0; i < allInput.length; i++) {
                            if (allInput[i].value === '') {
                                alert('Vui long nhap day du thong tin')
                                return
                            }
                        }
                        onAddVariant(variants, setListVariants, setOpenPopup, productForm, setProductForm)
                    }}
                        className="inline-block font-bold text-xl float-right bg-celticBlue text-white p-2 rounded cursor-pointer hover:bg-yaleBlue">Save product</span>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='general-infor border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>General information</span>
                        </div>
                        <div>
                            <label> Product name</label>
                            <input onChange={(e) => {
                                setProductForm({ ...productForm, productName: e.target.value })

                            }}
                                type="text" required className='required-field outline-none w-full border-2 border-gray-400 h-10 rounded pl-4' placeholder='Enter product name'></input>
                        </div>
                        <div>
                            <label> Product description</label>
                            <textarea onChange={(e) => {
                                setProductForm({ ...productForm, description: e.target.value })
                            }}
                                className=' required-field outline-none w-full border-2 border-gray-400 h-40 rounded p-4' placeholder='Enter product name'></textarea>

                        </div>
                    </div>
                    <div className='media border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>Media</span>
                            <UploadAndDisplayImage productForm={productForm} setProductForm={setProductForm} />
                        </div>
                    </div>
                    <div className='category border-2 border-gray-200 p-4'>

                        <div>
                            <span className='font-bold text-xl'>Category</span>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className=' flex flex-col'>
                                <label> Category</label>
                                <select className='border-2 border-gray-400 w-60 h-10 rounded'  value={currentCategory.parent} onChange={(e) => {

                                    const tmp = categories.find((i) => i.name === e.target.value)
                                    setCurrentCategory({ parent: e.target.value, child: tmp.childCategories[0].name })
                                }}>
                                    {categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>


                            <div className=' flex flex-col'>
                                <label>Sub Category</label>
                                <select name="categoryName" className='border-2 border-gray-400 w-60 h-10 rounded'  value={currentCategory.child} onChange={(e) => { 
                                    setProductForm({ ...productForm, categoryName: e.target.value }) 
                                    setCurrentCategory({ ...currentCategory, child: e.target.value })
                                }
                                    }>
                                    {categories.find((i) => i.name === currentCategory.parent).childCategories.map((item, index) => {
                                        return <option key={index} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="pricing border-2 border-gray-200 p-4 flex flex-col gap-2">
                        <div>
                            <span className='font-bold text-xl'>Pricing</span>
                        </div>
                        <div>
                            <label className='block'>Price</label>
                            <input 
                            onWheel={ event => event.currentTarget.blur()}
                            onChange={(e) => {
                                setProductForm({ ...productForm, price: e.target.value })
                            }}
                                type="number" className=' required-field outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                        <div>
                            <label className='block'>Discount</label>
                            <input 
                            onWheel={ event => event.currentTarget.blur()}
                            onChange={(e) => {
                                setProductForm({ ...productForm, discountPercent: e.target.value })
                            }}
                                type="number" className='required-field outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' placeholder='0 if not available'></input>
                        </div>
                        <div>
                            <label className='block'>Brand</label>
                            <input onChange={(e) => {
                                setProductForm({ ...productForm, brand: e.target.value })
                            }}
                                type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                        <div>
                            <label className='block'>Status</label>
                            <select className='border-2 border-gray-400 w-60 h-10 rounded' onChange={(e) => {
                                setProductForm({ ...productForm, productStatus: e.target.value })
                            }}>
                                <option value={"PUBLISHED"}>PUBLISHED</option>
                                <option value={"DRAFT"}>DRAFT</option>
                                <option value={"DELETED"}>DELETED</option>

                            </select>
                        </div>
                    </div>
                    <div className="variant">
                        <div>
                            <span className='font-bold text-xl'>Variant<span className='text-gray-400'>  (Ex: Type: Color, Values: green, red,..)</span></span>
                        </div>
                        <div>
                            <VariantsForm variants={variants} setVariants={setVariants} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

        </div>
    )
    else return (<div>Loading...</div>)
}

const UploadAndDisplayImage = ({ productForm, setProductForm }) => {
    // Define a state variable to store the selected image
    const [selectedImage, setSelectedImage] = useState([]);

    // Return the JSX for rendering
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4 flex-wrap p-4 w-full min-h-[100px] border-2 border-gray-200 rounded'>
                <label htmlFor="myImage" className='inline-block mt-[12px] ml-[12px] cursor-pointer bg-white border-dashed border-2 text-white rounded w-24 h-24 text-center content-center hover:bg-gray-200'>
                    <AddIcon className='text-black ' />
                </label>
                <input
                    id='myImage'
                    className='hidden'
                    type="file"
                    multiple
                    name="myImage"
                    onChange={(event) => {
                        let tmp = [...selectedImage]
                        for (let i = 0; i < event.target.files.length; i++) {
                            tmp.push({ path: event.target.files[i], isChoosed: true })
                        }
                        setSelectedImage(tmp);

                        setProductForm({ ...productForm, images: event.target.files })
                    }}
                />
                {selectedImage.length > 0 && (
                    selectedImage.map((item, index) => {
                        if (item.isChoosed === false) return null
                        return (
                            <div key={`image-${index}`} className='relative p-[12px] rounded'>
                                <div key={index} className='w-24 h-24 flex items-center bg-white rounded'>
                                    <img
                                        alt="not found"
                                        src={URL.createObjectURL(item.path)}
                                    />
                                </div>
                                <label className='absolute top-0 right-0 bg-gray-600 rounded-full' onClick={() => {
                                    let tmp = [...selectedImage];
                                    tmp[index].isChoosed = false
                                    setSelectedImage(tmp);
                                }} >
                                    <CloseIcon />
                                </label>
                            </div>
                        )
                    })

                )}

            </div>

        </div >
    );
};
function QuantityOfVariants({ variants, setOpenPopup, productForm, setProductForm }) {
    const navigate = useNavigate();
    if (variants.length === 0) {
        return (
            <div className='bg-white p-4'>
                <div className='w-[600px] rounded p-4 border-2 border-gray-200 flex flex-col gap-4 items-center'>
                    <span className='font-bold text-xl'>Enter quantity</span>
                    <input id="quantity" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' type='number' onChange={(e) => {
                        setProductForm({ ...productForm, quantity: e.target.value })
                    }} />
                    <button onClick={() => setOpenPopup(false)} className='bg-pumpkin p-2  w-1/2 rounded text-black'>Cancel</button>
                    <button onClick={() => {
                        if (document.getElementById("quantity").value === "") {
                            alert("Please enter quantity");
                            return
                        }
                        POST("seller/add-product", productForm).then((res) => {
                            setOpenPopup(false);
                            navigate("/seller/products");
                        })
                    }} className='bg-pumpkin p-2  w-1/2 rounded text-black'>Save</button>
                </div>
            </div>
        )
    }


    return (
        <div className='bg-white p-4 rounded'>
            <div><span>*Please type quantity of each variant ( 0 if not available)</span></div>
            <div className='w-[600px] rounded p-4 border-2 border-gray-200'>
                <span>Variant</span>
                <span className='float-right'>Quantity</span>
            </div>
            <div className='flex flex-col w-[600px] border-2 border-gray-200 overflow-y-scroll no-scrollbar max-h-[300px]'>
                {productForm.variantDetails.map((item, index) => {
                    return (
                        <div key={`${index}-${item}`} className='flex flex-row gap-4 w-full border-b-2 border-gray-200 h-auto'>
                            <span className='border-r-2 border-gray-200 grow place-content-center'>{JSONToData(item.variantDetail)}</span>
                            <input type="number" placeholder='type number' className='list-quantity outline-none w-1/6 h-10' onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                let tmp = [...productForm.variantDetails];
                                tmp[index].quantity = e.target.value
                                setProductForm({ ...productForm, variantDetails: tmp })
                            }}></input>
                        </div>

                    )
                })}
            </div>
            <div className='flex flex-row gap-4'>
                <button onClick={() => setOpenPopup(false)} className='bg-pumpkin p-2 w-1/2 rounded text-black'>Cancel</button>

                <button onClick={() => {
                    let tmp = 0
                    for (let i = 0; i < productForm.variantDetails.length; i++) {
                        console.log(productForm.variantDetails[i].quantity)
                        tmp += parseInt(productForm.variantDetails[i].quantity)
                    }
                    const listQuantity = document.getElementsByClassName("list-quantity")
                    for (let i = 0; i < listQuantity.length; i++) {
                        if (listQuantity[i].value === "") {
                            alert("Please enter quantity")
                            return
                        }
                    }
                    POST("seller/add-product", { ...productForm, quantity: tmp }
                    ).then((res) => {
                        if (res.code === "OK") {
                            navigate("/seller/products");
                            setOpenPopup(false)
                        } else {
                            alert(res.message)
                        }
                    })

                }

                } className='bg-pumpkin p-2  w-1/2 rounded text-black'>Save</button>
            </div>

        </div>
    )
}
function combine(list1, list2) {
    let tmp = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tmp.push([...list1[i], list2[j][0]])
        }
    }
    return tmp
}
function onAddVariant(variants, setListVariants, setOpenPopup, productForm, setProductForm) {
    console.log(productForm)
    const toString = (arr) => {
        let ans = ""
        arr.forEach(element => {
            ans = ans + element.type + ":" + element.value + ","
        });
        return ans.substring(0, ans.length - 1)
    }
    let tmp = []
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].isDeleted) continue
        let l = []
        for (let j = 0; j < variants[i].values.length; j++) {
            if (variants[i].values[j].isDeleted) continue
            l.push([{ type: variants[i].type, value: variants[i].values[j].value }])
        }
        tmp.push(l)
    }
    if (tmp.length === 0) {
        setProductForm({ ...productForm, variantDetails: [] })
        setListVariants([])
        setOpenPopup(true)
        return
    }
    let list = [...tmp[0]]
    for (let i = 1; i < tmp.length; i++) {
        list = combine(list, tmp[i])
    }
    setListVariants(list)
    const quantity = []
    for (let i = 0; i < list.length; i++) {
        let tmp = []
        for (let j = 0; j < list[i].length; j++) {
            tmp.push({ type: list[i][j].type, value: list[i][j].value })
        }
        quantity.push({
            variantDetail: JSON.stringify(tmp),
            quantity: 0
        })
    }
    setProductForm({ ...productForm, variantDetails: quantity })
    setOpenPopup(true)
}

// const v = [

//     {
//         type: 'color',
//         values: [
//             { value: 'red', id: 1 },
//             { value: 'green',id: 2 },
//             { value: 'blue',id: 3 },
//             { value: 'yellow',id: 4 },
//         ],
//         id 5
//     }
// ]
function VariantsForm({ variants, setVariants }) {
    return (
        <div>
            {
                variants.map((variant, index) => {
                    if (!variant.isDeleted)
                        return (
                            <VariantType key={index} variants={variants} setVariants={setVariants} index={index} />
                        )
                })
            }
            <label onClick={() => {
                let tmp = [...variants];
                tmp.push({ type: '', values: [], isDeleted: false });
                setVariants(tmp);
            }}
                className='inline-block mt-4 cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-fit text-center content-center hover:bg-gray-200'>
                <span className='text-black '>Add variant</span>
            </label>
        </div>
    );
}
function VariantType({ variants, setVariants, index }) {
    return (
        <div className='flex flex-row gap-4'>
            <div className=''>
                <label onClick={() => {
                    let tmp = [...variants];
                    tmp[index].isDeleted = true;
                    setVariants(tmp);
                }}
                    className='inline-block mt-[22px] cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-fit text-center content-center hover:bg-gray-200'>
                    <span className='text-black '>Delete</span>
                </label>
            </div>
            <div className='flex flex-col'>
                <label>Type</label>
                <input className='required-field outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={variants[index].type} onChange={(e) => {
                    let tmp = [...variants];
                    tmp[index].type = e.target.value;
                    setVariants(tmp);
                }} />
            </div>
            <div className='flex flex-col'>
                <label>Values</label>
                <div className='flex flex-row gap-4 items-center flex-wrap'>
                    {
                        variants[index].values.map((item, sub_index) => {
                            if (!item.isDeleted)
                                return (
                                    <VariantValue key={`${index}-${sub_index}`} variants={variants} setVariants={setVariants} index={index} sub_index={sub_index} />
                                );
                        })
                    }

                    <label onClick={() => {
                        let tmp = [...variants];
                        tmp[index].values.push({ value: "", isDeleted: false });

                        setVariants(tmp)
                    }}
                        className='inline-block cursor-pointer bg-white border-dashed border-2 text-white rounded w-10 h-10 text-center content-center hover:bg-gray-200'>
                        <AddIcon className='text-black ' />

                    </label>
                </div>

            </div>
        </div>
    );
}
function VariantValue({ variants, setVariants, index, sub_index }) {
    return (
        <div className='border-2 border-gray-400 rounded h-10'>
            <input className='required-field outline-none w-20 h-full rounded' defaultValue={variants[index].values[sub_index].value} onChange={(e) => {
                let tmp = [...variants];
                tmp[index].values[sub_index].value = e.target.value;
                setVariants(tmp);
            }} />
            <CloseIcon onClick={() => {
                let tmp = [...variants];
                tmp[index].values[sub_index].isDeleted = true;
                setVariants(tmp);
            }} />
        </div>
    );
}