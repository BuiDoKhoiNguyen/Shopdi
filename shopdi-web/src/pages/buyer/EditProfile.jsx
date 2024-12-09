import React, {useEffect, useState} from "react";
import profileDefault from "../../assets/images/profileDefault.png";
import axios from "axios";
import { baseUrl } from "../../api/GET";
const EditProfile = () => {
    const [addressList, setAddressList] = useState({});
    const [info, setInfo] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile"); // State để lưu tab đang được chọn
    const [isEdit, setIsEdit] = useState(false); // State để xác định xem có đang ở chế độ chỉnh sửa hay không
    const [errorNo, setErrorNo] = useState(""); // Lưu thông báo lỗi
    const [errorEmail, setErrorEmail] = useState(""); // Lưu thông báo lỗi
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
    const [addressIdToBeUpdated, setAddressIdToBeUpdated] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [addressUpdateForm, setAddressUpdateForm] = useState({});
    const [form, setForm] = useState({firstName: "", lastName: "", email: "", mobileNo: ""});
    const [passwordForm, setPasswordForm] = useState({
        token: localStorage.getItem('Authorization'),
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [addressForm, setAddressForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        district: "",
        city: "",
        email: "",
        phone: ""
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    }
    useEffect(() => {
        axios.get(`${baseUrl}users/my-info`, config)
            .then((respsonse) => {
                const data = respsonse.data;
                setInfo(data.result);
            })
        axios.get(`${baseUrl}address/shipping`, config)
            .then((respsonse) => {
                const data = respsonse.data;
                setAddressList(data.result);
            })
            .finally(() => {
                setisLoading(false);
            })

    }, []);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    function handleUpdateProfile() {
        console.log(info);
        console.log(form);
        const newForm = Object.fromEntries(Object.entries(form).filter(([key, value]) => value !== ""));
        if (errorNo === "" && errorEmail === "") {
            axios.put(`${baseUrl}users/update-profile`,
                {
                    firstName: form.firstName === "" ? info.firstName : form.firstName,
                    lastName: form.lastName === "" ? info.lastName : form.lastName,
                    email: form.email === "" ? info.email : form.email,
                    mobileNo: form.mobileNo === "" ? info.mobileNo : form.mobileNo

                },
                config
            )
                .then((respsonse) => {
                    const data = respsonse.data;
                    console.log(data);
                    window.alert("Cập nhật thông tin thành công");
                })
        }
    }

    function handleNumberChange(e) {
        setIsEdit(true);
        const value = e.target.value.trim();
        if (value === "") {
            setErrorNo("");
        } else if (!isPhoneNumber(value)) {
            setErrorNo("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setErrorNo("");
            setForm({...form, mobileNo: value});
        }
    }

    function handleEmailChange(e) {
        setIsEdit(true);
        const value = e.target.value.trim();
        if (value === "") {
            setErrorEmail("");
        } else if (!isEmail(value)) {
            setErrorEmail("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setErrorEmail(""); // Xóa lỗi nếu hợp lệ
            setForm({...form, email: value});
        }
    }

    // Hàm mở popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Hàm đóng popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Hàm xử lý khi chọn "Tiếp tục"
    const handleConfirm = () => {
        closePopup();
        setIsEdit(false);
        console.log("Thông tin đã được xác nhận để sửa.");
        handleUpdateProfile();
    };
    const AskAgainNotification = () => (
        <div
            className="fixed left-[15%] md:left-[20%] xl:left-[35%] bg-gray-500 bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="lg:text-[22px] font-bold text-gray-800">
                    Are you sure?
                </h2>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-orange-400 text-white xl:px-4 xl:py-2 rounded hover:bg-orange-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={closePopup}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    function openAddressPopup() {
        setIsAddressPopupOpen(true);
    }

    function closeAddressPopup() {
        setIsAddressPopupOpen(false);
    }

    function handleUpdateAddress(addressId) {
        setAddressIdToBeUpdated(addressId);
        axios.put(`${baseUrl}address/${addressId}`,
            addressUpdateForm,
            config
        ).then(r => {
            console.log(r);
        })
            .finally(() => {
                    setIsUpdatingAddress(false);
                    setAddressUpdateForm({});
                    axios.get(`${baseUrl}address/shipping`, config)
                        .then((respsonse) => {
                            const data = respsonse.data;
                            setAddressList(data.result);
                        })
                }
            )
        console.log("update address");

    }

    function handleDeleteAddress(id) {
        axios.delete(`${baseUrl}address/${id}`,
            config
        ).then(r => {
            console.log(r);
        })
        setAddressList(addressList.filter((address) => address.addressId !== id));

    }

    function handleAddAddress() {
        console.log(addressForm);
        axios.post(`${baseUrl}address/shipping`,
            addressForm,
            config)
            .then((respsonse) => {

                window.alert("Thêm địa chỉ thành công");
                setIsAddressPopupOpen(false);
                axios.get(`${baseUrl}address/shipping`, config)
                    .then((respsonse) => {
                        const data = respsonse.data;
                        setAddressList(data.result);
                    })
            })
    }

    function handleSetAddressAsDefault(addressId) {
        axios.put(`${baseUrl}address/${addressId}/default`, {}, config
        ).then(r => {
            axios.get(`${baseUrl}address/shipping`, config)
                .then((respsonse) => {
                    const data = respsonse.data;
                    setAddressList(data.result);
                })
        })
    }

    function handleChangePassword() {
        axios.post(`${baseUrl}auth/change-password`,
            passwordForm, config)
            .then((respsonse) => {
                window.alert("Đổi mật khẩu thành công");
            })
    }

    function handlePreviewProfileImage(e) {
        const file = e.target.files[0]; // Lấy file được chọn
        if (file) {
            setPreview(URL.createObjectURL(file)); // Tạo URL preview từ file
            setSelectedImage(file); // Lưu file đã chọn vào state
        }
    }

    function handleUploadProfileImage() {
        const formData = new FormData();
        formData.append('image', selectedImage);
        axios.post(`${baseUrl}images/upload-profile-buyer-image`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                }
            })
            .then((response) => {
                console.log(response);
                if(response.code === "OK") {
                    alert("Upload ảnh thành công");
                }
            }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setPreview(null);
            setInfo({...info, profileImage: preview});
        })

    }

    function handleOpenUpdateAddressPopup(addressId) {
        setIsUpdatingAddress(true);
        setAddressUpdateForm(addressList.filter((address) => address.addressId === addressId)[0]);
    }

    return (
        <div className={` bg-cloudBlue flex flex-col lg:flex-row font-sans md:text-[14px] p-1 md:p-12`}>
            <div className={`${isAddressPopupOpen ? 'pointer-events-none brightness-50' : ' '} lg:flex lg:flex-col `}>
                <ul className=" flex lg:flex-col lg:space-y lg:space-y-4 text-[12px] md:text-[18px] font-medium text-gray-500 dark:text-gray-400  md:me-4 mb-2 md:mb-0 bg-white px-4 py-6 ml-28 border-[1px]">
                    <li>
                        <a onClick={() => setActiveTab('profile')}
                           className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'profile' ? 'text-orangeRed' : 'text-tintedBlack'} bg-transparent  active w-full`}
                           aria-current="page">
                            Edit profile
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveTab('address')}
                           className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'address' ? 'text-orangeRed' : 'text-tintedBlack'}  bg-transparent active w-full`}
                           aria-current="page">
                            Edit address
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveTab('password')}
                           className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'password' ? 'text-orangeRed' : 'text-tintedBlack'}  bg-transparent active w-full`}
                           aria-current="page">
                            Change password
                        </a>
                    </li>
                </ul>
            </div>

            <div className={`xl:w-[65%]`}>

                {/* Account EditProfile Edit Section */}
                {activeTab === 'profile' && <section
                    className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} md:ml-[60px] xl:w-4xl mx-auto bg-white p-2 md:p-6 rounded-s mb-4 md:mb-8 border-[1px] border-[#E4E7E9]`}>
                    <h2 className="text-[16px] md:text-2xl mb-6 border-b-2 text-yaleBlue font-semibold pb-6">ACCOUNT PROFILE EDIT</h2>
                    <div className="md:flex md:flex-wrap md:-mx-4">
                        {/* EditProfile Image */}
                        <div className="w-full md:w-1/4 flex flex-col justify-top items-center  ">
                            <img
                                src={preview || info.profileImage || profileDefault}
                                alt="EditProfile"
                                className="w-10 h-10 lg:w-32 lg:h-32 border-[1px] border-gray-400 rounded-full"
                            />
                            {preview ? <button

                                    onClick={() => handleUploadProfileImage()}
                                    className="cursor-pointer bg-metallicOrange lg:h-[10%] lg:w-1/2 mt-1 text-white items-center justify-center flex rounded-lg hover:bg-red transition"
                                >
                                    Upload
                                </button>
                                :
                                <label
                                    htmlFor="file-upload"
                                    className="mt-6 cursor-pointer bg-[#FA8232] lg:h-[8%] lg:w-1/2 text-white items-center justify-center flex rounded hover:bg-orangeRed transition"
                                >
                                    Select image
                                </label>}
                            <input id={'file-upload'} className={'hidden'} type={"file"} accept={"image/*"}
                                   onChange={handlePreviewProfileImage}
                            />
                        </div>
                        {/* EditProfile Information */}
                        {isPopupOpen && <AskAgainNotification/>}
                        <div className="w-full md:w-3/4 pr-10 pb-8">
                            <div className="grid grid-cols-1 gap-2">
                                <div>
                                    <label className="block text-[15px] md:text-[20px] mb-2 col-span-2 font-semibold">
                                        Username: {info.username}
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-[18px] mb-2 col-span-2 font-medium">
                                        First name
                                    </label>
                                    <input
                                        id={"firstName"}
                                        type="text"
                                        defaultValue={info.firstName}
                                        onChange={(e) => {
                                            setIsEdit(true);
                                            setForm({...form, firstName: e.target.value});
                                        }}
                                        className="w-full border-[#E4E7E9] text-[14px] lg:text[16px] h-[40px] border-2 rounded p-2 col-span-2 mb-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-[18px] mb-1 col-span-2 font-medium">
                                        Last name
                                    </label>
                                    <input
                                        id={"lastName"}
                                        type="text"
                                        defaultValue={info.lastName}
                                        onChange={(e) => {
                                            setIsEdit(true);
                                            setForm({...form, lastName: e.target.value});
                                        }}
                                        className="w-full border-[#E4E7E9] text-[14px] lg:text[16px] h-[40px] border-2 rounded p-2 col-span-2 mb-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-[18px] mb-1 col-span-2 font-medium">
                                        Email
                                    </label>
                                    <input
                                        id={"email"}
                                        type="text"
                                        defaultValue={info.email}
                                        onChange={handleEmailChange}
                                        className="w-full border-[#E4E7E9] text-[14px] lg:text[16px] h-[40px] border-2 rounded p-2 col-span-2 mb-2"
                                    />
                                    {errorEmail &&
                                        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-red">Invalid Email</p>}
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-[18px] mb-1 col-span-2 font-medium">
                                        Phone number
                                    </label>
                                    <input
                                        id={"phone"}
                                        type="number"
                                        defaultValue={info.mobileNo}
                                        onChange={handleNumberChange}
                                        className="w-full border-[#E4E7E9] text-[14px] lg:text[16px] h-[40px] border-2 rounded p-2 col-span-2"
                                    />
                                    {errorNo &&
                                        <p className=" text-[10px] md:text-[12px] lg:text-[16px] text-red">Invalid phone number</p>}
                                </div>
                            </div>
                            {isEdit && <button onClick={() => {
                                openPopup();
                            }}
                                               className="bg-[#FA8232] text-[14px] text-white py-1 px-1 mt-1 md:py-2 md:px-4 md:mt-6 rounded hover:bg-orangeRed">
                                Save Changes
                            </button>
                            }
                        </div>
                    </div>
                </section>
                }

                {/* Billing and Shipping Address Section */}
                {activeTab === 'address' &&
                    <section
                        className={`md:ml-[60px] max-w-4xl mx-auto bg-white p-2 md:p-6 mb-8 border-[1px] border-[#E4E7E9]`}>
                        <div className="relative w-full md:w-full lg:mb-4">
                            <h3 className="text-[16px] md:text-2xl mb-6 border-b-2 text-yaleBlue font-semibold pb-6">MY ADDRESS</h3>
                            <button onClick={openAddressPopup}
                                    className={` ${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} absolute right-0 top-0 lg:top-0 lg:right-5 xl:absolute xl:top-[0px] xl:right-[0px] bg-[#FA8232] lg:h-[30px] xl:h-[40px] rounded px-1 md:px-2 text-white text-[12px] lg:text-[16px] hover:bg-orangeRed`}>
                                Add new address
                            </button>
                            {isAddressPopupOpen &&
                                <div
                                    className="w-full md:w-1/3 md:h-2/3 overflow-y-auto border-2 border-orangeRed fixed z-10 bg-[#E4E7E9] top-[15%] right-[35%]  px-0 md:px-4 py-2">
                                    <h3 className=" text-[20px] mb-4 border-b-2 border-gray-400 pb-2">Add new address</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            {
                                                label: "First Name",
                                                labelForm: "firstName",
                                                placeholder: "Enter your first name"
                                            },
                                            {
                                                label: "Last Name",
                                                labelForm: "lastName",
                                                placeholder: "Enter your last name"
                                            },
                                            {
                                                label: "Address",
                                                labelForm: "address",
                                                placeholder: "specific address",
                                                colSpan: true
                                            },
                                            {label: "District", labelForm: "state", placeholder: "District"},
                                            {label: "City", labelForm: "city", placeholder: "City"},
                                            {label: "Country", labelForm: "country", placeholder: "Country"},
                                            {
                                                label: "Phone Number",
                                                labelForm: "phoneNumber",
                                                placeholder: "Phone number",
                                            },
                                            {
                                                label: "Email",
                                                labelForm: "email",
                                                placeholder: "email@example.com",
                                                colSpan: true
                                            },
                                        ].map((field, index) => (
                                            <div key={index} className={field.colSpan ? "col-span-2" : ""}>
                                                <label className="block text-[14px] md:text-[14px] mb-1">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => {
                                                        setAddressForm({
                                                            ...addressForm,
                                                            [field.labelForm]: e.target.value
                                                        });
                                                    }}
                                                    required={true}
                                                    className="w-full border-[#E4E7E9] md:text-[12px] border-2 rounded p-2"
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        ))}
                                        <div className={`col-span-2 flex    `}>
                                            <label className="block text-[14px] md:text-[14px] pr-2">
                                                Select as default address
                                            </label>
                                            <input type={"checkbox"} className={"w-4 h-4"} onChange={(e) => {
                                                setAddressForm({...addressForm, default: e.target.checked});
                                            }}/>
                                        </div>
                                    </div>
                                    <button onClick={handleAddAddress}
                                            className="bg-[#FA8232] text-white py-2 px-4 mt-2 rounded hover:bg-orange-600">
                                        Save Changes
                                    </button>
                                    <button onClick={closeAddressPopup}
                                            className="bg-gray-500 mx-2 text-white py-2 px-4 mt-2 rounded hover:bg-gray-600">
                                        Cancel
                                    </button>
                                </div>
                            }
                            <div>
                                <h4 className=" text-[14px] xl:text-xl mt-1 md:pb-2 font-sans">Address</h4>
                                <div>
                                    {addressList.map((address) =>
                                        (
                                            <div className={`lg:flex lg:relative border-b-2`}>
                                                <div className={`flex flex-col`}>
                                                    <div className={`text-[14px] lg:text-[18px] pt-2`}>
                                                        <b>{address.firstName + " " + address.lastName}</b> {"| " + address.phoneNumber}
                                                    </div>
                                                    <span className={`text-[16px] pt-2`}>{address.email}</span>
                                                    <span
                                                        className={`text-[16px] pt-1 ${address.default !== true ? 'md:mb-2' : ''}`}>{address.address}</span>
                                                    {address.default === true && <span
                                                        className={`text-[18px] pt-1 max-w-fit md:mb-2 text-red`}>Default</span>}
                                                </div>
                                                {isUpdatingAddress &&
                                                    <div
                                                        className="w-full md:w-1/3 md:h-2/3 overflow-y-auto border-2 border-orangeRed fixed bg-[#E4E7E9] top-[15%] right-[35%]  px-0 md:px-4 py-2">
                                                        <h3 className=" text-[20px] mb-4 border-b-2 border-gray-400 pb-2">Edit address</h3>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {[
                                                                {
                                                                    label: "First Name",
                                                                    labelForm: "firstName",
                                                                    placeholder: "Enter your first name"
                                                                },
                                                                {
                                                                    label: "Last Name",
                                                                    labelForm: "lastName",
                                                                    placeholder: "Enter your last name"
                                                                },
                                                                {
                                                                    label: "Address",
                                                                    labelForm: "address",
                                                                    placeholder: "specific address",
                                                                    colSpan: true
                                                                },
                                                                {
                                                                    label: "District",
                                                                    labelForm: "state",
                                                                    placeholder: "District"
                                                                },
                                                                {label: "City", labelForm: "city", placeholder: "City"},
                                                                {label: "Country", labelForm: "country", placeholder: "country"},
                                                                {
                                                                    label: "Phone Number",
                                                                    labelForm: "phoneNumber",
                                                                    placeholder: "Phone number",
                                                                },
                                                                {
                                                                    label: "Email",
                                                                    labelForm: "email",
                                                                    placeholder: "email@example.com",
                                                                    colSpan: true
                                                                },

                                                            ].map((field, index) => (
                                                                <div key={index}
                                                                     className={field.colSpan ? "col-span-2" : ""}>
                                                                    <label
                                                                        className="block text-[14px] md:text-[14px] mb-1">
                                                                        {field.label}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={addressUpdateForm[field.labelForm]}
                                                                        onChange={(e) => {
                                                                            setAddressUpdateForm({
                                                                                ...addressUpdateForm,
                                                                                [field.labelForm]: e.target.value
                                                                            });
                                                                        }}
                                                                        required={true}
                                                                        className="w-full border-[#E4E7E9] md:text-[12px] border-2 rounded p-2"
                                                                        placeholder={field.placeholder}
                                                                    />
                                                                </div>
                                                            ))}

                                                        </div>
                                                        <button onClick={() => handleUpdateAddress(address.addressId)}
                                                                className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded hover:bg-orange-600">
                                                            Save Changes
                                                        </button>
                                                        <button onClick={() => {
                                                            setIsUpdatingAddress(false);
                                                            setAddressUpdateForm({});
                                                        }}
                                                                className="bg-gray-500 mx-2 text-white py-2 px-4 mt-4 rounded hover:bg-gray-600">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                }
                                                <div
                                                    className={`xl:ml-[400px] text-[14px] lg:text-[16px] xl:text-[18px]`}>
                                                    <button
                                                        onClick={() => handleOpenUpdateAddressPopup(address.addressId)}
                                                        className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} text-yaleBlue hover:underline py-2 px-3 mr-1 xl:mr-16 xl:absolute xl:top-2 xl:right-8`}>Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteAddress(address.addressId)}
                                                            className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''}  text-yaleBlue hover:underline py-2 px-3  mr-1 xl:absolute xl:top-2 xl:right-0`}>Delete
                                                    </button>
                                                    {address.default === false && <button onClick={() =>
                                                        handleSetAddressAsDefault(address.addressId)
                                                    }
                                                                                          className={`${isAddressPopupOpen || isUpdatingAddress || isPopupOpen ? 'pointer-events-none' : ''} text-white bg-[#FA8232] py-1 px-3 rounded hover:bg-orangeRed xl:absolute mr-1 xl:right-0 xl:top-14`}>Set as default
                                                    </button>}

                                                </div>
                                            </div>

                                        )
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                }
                {/* Change Password Section */}
                {activeTab === 'password' &&
                    <section
                        className="md:ml-[60px] mx-auto bg-white px-2 md:p-6 border-[1px] border-[#E4E7E9] font-sans">
                        <h3 className="text-[16px] md:text-2xl mb-6 border-b-2 text-yaleBlue font-semibold pb-6">CHANGE PASSWORD</h3>
                        <div className="grid grid-cols-1 gap-1 md:gap-4">
                            {[
                                {label: "Current Password", labelForm: "currentPassword", type: "password"},
                                {label: "New Password", labelForm: "newPassword", type: "password"},
                                {label: "Confirm Password", labelForm: "confirmPassword", type: "password"},
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-[14px] md:text-[18px] font-medium my-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        onChange={(e) => {
                                            setPasswordForm({...passwordForm, [field.labelForm]: e.target.value});
                                        }}
                                        className="w-full md:h-[50px] border-[#E4E7E9] border-2 rounded p-2"
                                        placeholder="••••••••"
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleChangePassword()}
                                className="bg-[#FA8232] text-white flex h-[30px] xl:h-[40px] xl:my-4 items-center p-2 mb-1 rounded hover:bg-orange-600">
                            <span className={`text-[12px] md:text-[16px] `}>Save password</span>
                        </button>
                    </section>
                }
            </div>
        </div>
    );
};

function isPhoneNumber(phoneNumber) {
    const regex = /^(?:\+84|0)([3|5|7|8|9])\d{8}$/;
    return regex.test(phoneNumber);
}

function isEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}


export default EditProfile;
