import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { Route, Routes } from "react-router-dom";
import ProductList from "../../components/Buyer/ProductList.jsx";
import Filter from "../../components/Buyer/Filter.jsx";
import ProductDetail from "./ProductDetail.jsx";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import Cart from "../../components/Buyer/Cart.jsx";
import { GET } from "@/api/GET";
const HomePage = () => {
  const location = useLocation();
  const currentCategory = decodeURIComponent(location.pathname.split("/")[1]);

  const query = new URLSearchParams(location.search);
  const pageParams = query.get('page');
  let pageUrl = ''
  if (pageParams !== null) {
    pageUrl = `?page=${pageParams}`
  }
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (location.pathname === '/') {
      GET("products" + pageUrl).then((data) => {
        setProducts(data.result?.items)
        setIsLoading(false)
      })
    } else {
      GET(`products/categories/${currentCategory}` + pageUrl).then((res) => {
        if (res.code === "OK") {
          setProducts(res.result?.items)
        }
      })
    }
  }, [location])


  return (
    <div>
      <Routes>
        <Route path="/" element={<div className='flex flex-col justify-center'>
          <ProductList products={products} />
        </div>} />
        <Route path="/:category" element={
          <div className="flex flex-row">
            <div className="w-1/4">
              <Filter products={products} setProducts={setProducts} />
            </div>
            <div className="w-3/4">
              <ProductList products={products} />
            </div>

          </div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>


    </div>
  )
}

export default HomePage