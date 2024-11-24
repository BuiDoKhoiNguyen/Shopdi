package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.ProductRequest.VariantDetail;
import com.rs.shopdiapi.domain.dto.request.ProductFilterRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProductDetailResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.*;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.ProductMapper;
import com.rs.shopdiapi.repository.*;
import com.rs.shopdiapi.service.CategoryService;
import com.rs.shopdiapi.service.ImageService;
import com.rs.shopdiapi.service.ProductService;
import com.rs.shopdiapi.service.ReviewService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    CategoryService categoryService;
    ProductMapper productMapper;
    SellerRepository sellerRepository;
    TagRepository tagRepository;
    ReviewService reviewService;

    @Transactional
    @Override
    public ProductDetailResponse createProduct(ProductRequest request, Long sellerId) {
        Category category = categoryService.getCategoryByName(request.getCategoryName());

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        Set<Tag> tags = request.getTagNames().stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> new Tag(tagName)))
                .collect(Collectors.toSet());

        Product product = Product.builder()
                .productName(request.getProductName())
                .description(request.getDescription())
                .price(request.getPrice())
                .brand(request.getBrand())
                .category(category)
                .seller(seller)
                .tags(tags)
                .status(ProductStatusEnum.valueOf(request.getStatus()))
                .build();

        Set<Variant> variants = request.getVariantDetails().stream()
                .map(detail -> {
                    Variant variant = new Variant();
                    variant.setProduct(product);
                    variant.setVariantDetail(detail.getVariantDetail());
                    variant.setQuantity(detail.getQuantity());
                    return variant;
                }).collect(Collectors.toSet());
        product.setVariants(variants);

        Product savedProduct = productRepository.save(product);


        return ProductDetailResponse.builder()
                .productId(savedProduct.getId())
                .productName(savedProduct.getProductName())
                .description(savedProduct.getDescription())
                .price(savedProduct.getPrice())
                .brand(savedProduct.getBrand())
                .status(savedProduct.getStatus())
                .categoryName(savedProduct.getCategory() != null ? savedProduct.getCategory().getName() : null)
                .tagNames(savedProduct.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .sellerId(savedProduct.getSeller().getId())
                .shopName(savedProduct.getSeller().getShopName())
                .variants(savedProduct.getVariants().stream()
                        .map(variant -> ProductDetailResponse.VariantResponse.builder()
                                .variantDetail(variant.getVariantDetail())
                                .quantity(variant.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional
    @Override
    public String deleteProduct(Long productId, Long sellerId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getSeller().getId().equals(sellerId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        productRepository.deleteById(productId);
        return "Product deleted successfully";
    }

    @Transactional
    @Override
    public ProductResponse updateProduct(ProductRequest productRequest, Long productId) {
        var product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        productMapper.updateProduct(product, productRequest);

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @Override
    public ProductDetailResponse findProductById(Long productId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return ProductDetailResponse.builder()
                .productId(product.getId())
                .productName(product.getProductName())
                .description(product.getDescription())
                .price(product.getPrice())
                .brand(product.getBrand())
                .status(product.getStatus())
                .imageUrls(product.getImageUrls())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null) // Danh mục sản phẩm
                .tagNames(product.getTags() != null
                        ? product.getTags().stream().map(Tag::getName).collect(Collectors.toSet())
                        : Set.of())
                .sellerId(product.getSeller() != null ? product.getSeller().getId() : null) // ID người bán
                .shopName(product.getSeller() != null ? product.getSeller().getShopName() : null) // Tên shop của người bán
                .variants(product.getVariants() != null
                        ? product.getVariants().stream()
                        .map(variant -> ProductDetailResponse.VariantResponse.builder()
                                .variantDetail(variant.getVariantDetail())
                                .quantity(variant.getQuantity())
                                .build())
                        .toList()
                        : List.of())
                .build();
    }

    @Override
    public PageResponse<?> searchProduct(String query, int pageNo, int pageSize) {
        return null;
    }

    @Override
    public PageResponse<?> findProductByCategory(String category, int pageNo, int pageSize) {
        var categoryEntity = categoryService.getCategoryByName(category);

        Page<Product> productPage = productRepository.findAllByCategoryId(categoryEntity.getId(), PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public PageResponse<?> filterProducts(ProductFilterRequest filterRequest, int pageNo, int pageSize) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasProductName(filterRequest.getProductName()))
                .and(ProductSpecification.hasCategory(filterRequest.getCategories()))
                .and(ProductSpecification.hasBrand(filterRequest.getBrands()))
                .and(ProductSpecification.hasPriceBetween(filterRequest.getMinPrice(), filterRequest.getMaxPrice()))
                .and(ProductSpecification.hasDiscountBetween(filterRequest.getMinDiscount(), filterRequest.getMaxDiscount()))
                .and(ProductSpecification.hasRatingBetween(filterRequest.getMinRating(), filterRequest.getMaxRating()));

        Page<Product> productPage = productRepository.findAll(specification, PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }


//    @Override
//    public PageResponse<?> getAllProductByFilter(ProductFilterRequest filterRequest, int pageNo, int pageSize) {
//        List<Product> products = productRepository.filterProducts(
//                filterRequest.getCategories(),
//                filterRequest.getBrands(),
//                filterRequest.getMinPrice(),
//                filterRequest.getMaxPrice(),
//                filterRequest.getMinDiscount(),
//                filterRequest.getMinRating(),
//                filterRequest.getSortByDiscount(),
//                filterRequest.getSortByPrice(),
//                PageRequest.of(pageNo, pageSize)
//        );
//
//
//        return PageResponse.builder()
//                .pageNo(pageNo)
//                .pageSize(pageSize)
//                .totalPages(0)
//                .items(List.of())
//                .build();
//    }



    @Override
    public PageResponse<?> getAllProducts(int pageNo, int pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> productPage = productRepository.findAll(PageRequest.of(pageNo, pageSize, sortByAndOrder));

        List<ProductResponse> products = productPage.stream()
                .map(product -> ProductResponse.builder()
                        .productId(product.getId())
                        .productImage(product.getImageUrls() != null && !product.getImageUrls().isEmpty()
                                ? product.getImageUrls().get(0)
                                : null)
                        .productName(product.getProductName())
                        .rating(reviewService.calculateAverageRating(product.getId()))
                        .reviewCount(reviewService.countReviewsByProduct(product.getId()))
                        .price(product.getPrice())
                        .build()
                ).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public PageResponse<?> getMyProducts(int pageNo, int pageSize, String sortBy, String sortOrder, Long sellerId) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> productPage = productRepository.findAllBySellerId(sellerId, PageRequest.of(pageNo, pageSize, sortByAndOrder));
        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

}
