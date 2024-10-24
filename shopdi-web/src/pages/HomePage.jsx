import React from 'react'
import ProductList from '@/components/buyer/ProductList'
import Navigation from '@/components/Navigation/Navigation'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg';
import Filter from '@/components/buyer/Filter';
import { useState } from 'react';
import ProductDetail from '../components/buyer/ProductDetail';
import ShopPage from '@/components/buyer/ShopPage';
import CATEGORIES from '@/data/categories_data';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const HomePage = () => {
  let product = {
    id: 0,
    name: "Product 1",
    image: shopdiLogo,
    rating: 3.5,
    sold: 100,
    price: 100
  };
  let product_tmp = [];
  for (let i = 0; i < 10; i++) {
    let tmp = { ...product };
    tmp.id = i;
    tmp.name = "Product " + (i + 1);
    tmp.rating = Math.random() * 5;
    tmp.sold = Math.floor(Math.random() * 1000);
    tmp.price = Math.floor(Math.random() * 1000000);
    product_tmp.push(tmp);
  }
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: "", sub_categories: [] });

  return (
    <div>
      <Navigation setIsFiltered={setIsFiltered} setCurrentCategory={setCurrentCategory} />
      <Routes>
        <Route path="/" element={<div className='flex flex-col justify-center'>
          <ProductList products={product_tmp} />
        </div>} />
        <Route path="/:category" element={<div>
          <Filter category={currentCategory} products={product_tmp} />
        </div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>


    </div>
  )
}

export default HomePage