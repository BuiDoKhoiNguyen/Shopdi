package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.ProductFilterRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProductDetailResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Product;

public interface ProductService {
    ProductDetailResponse createProduct(ProductRequest productRequest, Long sellerId);

    String deleteProduct(Long productId, Long sellerId);

    ProductResponse updateProduct(ProductRequest request, Long productId);

    ProductDetailResponse findProductById(Long productId);

    PageResponse<?> searchProduct(String query, int pageNo, int pageSize);

    PageResponse<?> findProductByCategory(String category, int pageNo, int pageSize);
    PageResponse<?> findProductByParentCategory(String category, int pageNo, int pageSize);


    PageResponse<?> filterProducts(ProductFilterRequest filterRequest, int pageNo, int pageSize);

//    PageResponse<?> getAllProductByFilter(ProductFilterRequest filterRequest, int pageNo, int pageSize); ;

    PageResponse<?> getAllProducts(int pageNo, int pageSize, String sortBy, String sortOrder);

    PageResponse<?> getMyProducts(int pageNo, int pageSize, String sortBy, String sortOrder, Long sellerId);

}
