const Quantity = ({quantity, setQuantity}) => {
    
        return (
            <div className='flex flex-row max-h-8 w-fit'>
                <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1) }}>-</button>
                <div className='min-w-16 text-center border-gray-300 border-y-2'><span >{quantity}</span></div>
                <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() =>{ setQuantity(quantity + 1)}}>+</button>
            </div>
        )
    
}
export default Quantity;