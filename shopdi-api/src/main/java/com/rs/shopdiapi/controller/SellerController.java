package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.PageConstants;
import com.rs.shopdiapi.service.ProductService;
import com.rs.shopdiapi.service.SellerService;
import com.rs.shopdiapi.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class SellerController {
    SellerService sellerService;
    ProductService productService;
    UserService userService;

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/add-product")
    public ApiResponse<?> addProduct(@RequestBody @Valid ProductRequest request) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.createProduct(request, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/update-product/{productId}")
    public ApiResponse<?> updateProduct(@PathVariable Long productId, @RequestBody ProductRequest request) {
        return ApiResponse.builder()
                .result(productService.updateProduct(request, productId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/delete-product/{productId}")
    public ApiResponse<?> deleteProduct(@PathVariable Long productId) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.deleteProduct(productId, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/my-products")
    public ApiResponse<?> getMyProducts(@RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                        @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize,
                                        @RequestParam(defaultValue = PageConstants.SORT_BY_ID, required = false) String sortBy,
                                        @RequestParam(defaultValue = PageConstants.SORT_DIR, required = false) String sortOrder) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.getMyProducts(pageNo, pageSize, sortBy, sortOrder, sellerId))
                .build();
    }

//    @PreAuthorize("hasRole('SELLER')")
//    @GetMapping("/orders")
//    public ApiResponse<?> getOrders(@RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
//                                   @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize,
//                                   @RequestParam(defaultValue = PageConstants.SORT_BY_ID, required = false) String sortBy,
//                                   @RequestParam(defaultValue = PageConstants.SORT_DIR, required = false) String sortOrder) {
//        Long sellerId = sellerService.getCurrentSeller().getId();
//        return ApiResponse.builder()
//                .result(sellerService.getOrders(pageNo, pageSize, sortBy, sortOrder, sellerId))
//                .build();
//    }

    @PostMapping("/register")
    public ApiResponse<?> registerSeller(@RequestBody @Valid RegisterSellerRequest request) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(sellerService.sellerRegister(request, user))
                .build();
    }
}