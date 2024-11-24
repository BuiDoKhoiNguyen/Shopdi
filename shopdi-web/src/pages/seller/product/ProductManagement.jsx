import React from 'react'
import ProductList from '@/components/Seller/product/ProductList'
import Filter from '@/components/Seller/product/Filter'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GET } from '@/api/GET'
import CATEGORIES from '@/data/categories_data';
import { POST } from '../../../api/GET';
export default function ProductManagement() {
  const categories = CATEGORIES.CATEGORIES
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParams = query.get('page');
  let pageUrl = ''
  if (pageParams !== null) {
    pageUrl = `?page=${pageParams}`
  }
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    GET("seller/my-products" + pageUrl).then((data) => {
      setProducts(data.result?.items)
      setIsLoading(false)

    })
  }, [])
  return (
    <div>
      <Filter>
        <ProductList products={products} />
      </Filter>
    </div>
  )
}