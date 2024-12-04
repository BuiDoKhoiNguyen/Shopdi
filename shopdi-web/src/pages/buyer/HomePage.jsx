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

  const [page, setPage] = useState({ pageNo: 0, totalPage: 1 })
  const query = new URLSearchParams(location.search);
  const currentCategory = query.get('category');
  const [categories, setCategories] = useState({})
  const pageParams = query.get('page');
  let pageUrl = ''
  if (pageParams !== null) {
    pageUrl = `?pageNo=${pageParams - 1}`
  }
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (location.pathname === '/') {
      GET(`products` + pageUrl).then((res) => {
        if (res.code === "OK") {
          setProducts(res.result?.items)
          setPage({ pageNo: res.result.pageNo, totalPage: res.result.totalPages })
          setIsLoading(false)
        }
      })
    }
    else if (location.pathname.split("/")[1] === "category") {
      GET(`categories/${location.pathname.split("/")[2]}`).then((res) => {
        if (res.code === "OK") {
          setCategories(res.result)
          if (currentCategory !== null) {
            GET(`products/category/` + decodeURIComponent(currentCategory) + pageUrl).then((res) => {
              if (res.code === "OK") {
                setProducts(res.result?.items)
                setPage({ pageNo: res.result.pageNo, totalPage: res.result.totalPages })
                setIsLoading(false)
              }
            })
          } else {
            GET(`products/category/${location.pathname.split("/")[2]}`).then((res) => {
              if (res.code === "OK") {
                setProducts(res.result?.items)
                setPage({ pageNo: res.result.pageNo, totalPage: res.result.totalPages })
                setIsLoading(false)

              }
            })

          }
        }
      })
    }
    else if (location.pathname.split("/")[1] === "search") {
      GET(`products/search?query=${query.get("query")}`).then((res) => {
        if (res.code === "OK") {
          setProducts(res.result?.items)
          setPage({ pageNo: res.result.pageNo, totalPage: res.result.totalPages })
          setIsLoading(false)
        }
      })
    }
  }, [location])


  if (!isLoading) {
    return (
      <div>
        <Routes>
          <Route path="/" exact element={<div className='flex flex-col justify-center'>
            <ProductList products={products} page={page} />
          </div>} />
          <Route path="/category/:categoryId" exact element={
            <div className="flex flex-row">
              <div className="w-1/4">
                <Filter categories={categories} />
              </div>
              <div className="w-3/4">
                <ProductList products={products} page={page} />
              </div>
            </div>} />
          <Route path="/search" exact element={
            // <div className="flex flex-row">
            //   <div className="w-1/4">
            //     <Filter products={products} setProducts={setProducts} />
            //   </div>
            //   <div className="w-3/4">
            //     <ProductList products={products} page={page} />
            //   </div>
            // </div>
            <div className='flex flex-col justify-center'>
              <ProductList products={products} page={page} />
            </div>

          } />
          <Route path="/product/:id" exact element={<ProductDetail />} />
        </Routes>


      </div>
    )
  } else {
    return <div className="text-center">Loading...</div>
  }
}

export default HomePage