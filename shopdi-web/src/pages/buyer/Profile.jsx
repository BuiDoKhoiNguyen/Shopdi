import React, {useState} from "react";
import UETLogo from "/src/assets/images/UETLogo.png";

const Profile = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");

    const countries = [
        { label: "United States", value: "US" },
        { label: "Bangladesh", value: "BD" },
        { label: "Canada", value: "CA" },
        { label: "Vietnam", value: "VN" }
    ];
    const states = [
        { label: "California", value: "CA" },
        { label: "New York", value: "NY" },
        { label: "Texas", value: "TX" },
        { label: "Florida", value: "FL" }
    ];
    return (
        <div className="bg-[#F7FBFF] font-sans text-[14px] p-1 md:p-8">
            {/* Account Profile Edit Section */}
            <section className="max-w-4xl mx-auto bg-white p-2 md:p-6 rounded-s mb-4 md:mb-8 border-2 border-[#E4E7E9]">
                <h2 className="text-[20px] md:text-xl mb-6 border-b-4">ACCOUNT PROFILE EDIT</h2>
                <div className="flex flex-wrap -mx-4">
                    {/* Profile Image */}
                    <div className="w-full md:w-1/4 px-4 mb-4 md:mb-0 flex items-center justify-center">
                        <img
                            src={UETLogo}
                            alt="Profile"
                            className="w-40 h-40 rounded-full"
                        />
                    </div>
                    {/* Profile Information */}
                    <div className="w-full md:w-3/4 px-4">
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                {label: "Display Name", placeholder: "Kevin"},
                                {label: "Username", placeholder: "Display name"},
                                {label: "Full Name", placeholder: "Kevin Gilbert"},
                                {label: "Email", placeholder: "kevin@gmail.com"},
                                {label: "Secondary Email", placeholder: "kevin1234@gmail.com"},
                                {label: "Phone Number", placeholder: "+1 202-555-0118"},

                            ].map((field, index) => (

                                <div key={index} className='col-span-2'>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-[#E4E7E9] border-2 rounded-sm p-2 col-span-2"
                                        placeholder={field.placeholder}
                                    />
                                </div>

                            ))}
                            <div className='col-span-2'>
                                <label className="block text-[15px] text-sm mb-1">
                                    Country/Region
                                </label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full border-[#E4E7E9] bg-white border-2 rounded-sm p-2"
                                >
                                    <option value="" disabled>Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.value}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-span-1'>
                                <label className="block text-[15px] text-sm mb-1">
                                    State
                                </label>
                                <select
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    className="w-full border-[#E4E7E9] bg-white border-2 rounded-sm px-0 py-2 md:p-2"
                                >
                                    <option value="" disabled>Select a state</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state.value}>
                                            {state.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-span-1'>
                                <label className="block text-[15px] text-sm mb-1">
                                    Zip Code
                                </label>
                                <input type='text' placeholder='zipcode' className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"/>

                            </div>
                        </div>
                        <button
                            className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            {/* Billing and Shipping Address Section */}
            <section className="max-w-4xl mx-auto bg-white p-6 mb-8 border-2 border-[#E4E7E9]">
                <div className="flex flex-wrap -mx-4">
                    {/* Billing Address */}
                    <AddressForm title="Billing Address"/>

                    {/* Shipping Address */}
                    <AddressForm title="Shipping Address"/>
                </div>
            </section>

            {/* Change Password Section */}
            <section className="max-w-4xl mx-auto bg-white px-2 md:p-6 border-2 border-[#E4E7E9] font-sans">
                <h3 className=" text-[20px] text-xl border-b-4 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: "Current Password", type: "password" },
                        { label: "New Password", type: "password" },
                        { label: "Confirm Password", type: "password" },
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-[15px] md:text-sm mb-1">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                                placeholder="••••••••"
                            />
                        </div>
                    ))}
                </div>
                <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
                    Change Password
                </button>
            </section>
        </div>
    );
};

const AddressForm = ({ title }) => (
    <div className="w-full md:w-1/2 px-0 md:px-4 mb-4">
        <h3 className=" text-[20px] text-xl mb-4 border-b-4">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
            {[
                { label: "First Name", placeholder: "Kevin" },
                { label: "Last Name", placeholder: "Gilbert" },
                { label: "Company Name", placeholder: "Optional", colSpan: true },
                { label: "Address", placeholder: "Street address", colSpan: true },
                { label: "Country", placeholder: "Country" },
                { label: "Region/State", placeholder: "State" },
                { label: "City", placeholder: "City" },
                { label: "Zip Code", placeholder: "Zip Code" },
                { label: "Email", placeholder: "email@example.com", colSpan: true },
                { label: "Phone Number", placeholder: "Phone number", colSpan: true },
            ].map((field, index) => (
                <div key={index} className={field.colSpan ? "col-span-2" : ""}>
                    <label className="block text-[15px] md:text-sm mb-1">
                        {field.label}
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                        placeholder={field.placeholder}
                    />
                </div>
            ))}
        </div>
        <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
            Save Changes
        </button>
    </div>
);

export default Profile;
