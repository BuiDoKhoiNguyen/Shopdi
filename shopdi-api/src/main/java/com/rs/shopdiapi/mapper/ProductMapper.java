package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mappings({
        @Mapping(target = "productId", source = "id"), // Explicit mapping for productId
             @Mapping(target = "categoryName", source = "category.name"), // Example if you want categoryName in ProductResponse
             @Mapping(target = "sellerId", source = "seller.id"),
             @Mapping(target = "shopName", source = "seller.shopName"),
    })
    ProductResponse toProductResponse(Product product);
    @Named("getCategoryName")
    default String getCategoryName(com.rs.shopdiapi.domain.entity.Category category) {
        return category.getName()+"#"+category.getParentCategory().getName();
    }
    @Named("getSellerId")
    default Long getSellerId(com.rs.shopdiapi.domain.entity.Seller seller) {
        return seller.getId();
    }
    Product toProduct(ProductRequest request);

    void updateProduct(@MappingTarget Product product, ProductRequest productRequest);
}
// package com.rs.shopdiapi.mapper;

// import com.rs.shopdiapi.domain.dto.request.ProductRequest;
// import com.rs.shopdiapi.domain.dto.response.ProductResponse;
// import com.rs.shopdiapi.domain.entity.Product;
// import org.mapstruct.Mapper;
// import org.mapstruct.Mapping;
// import org.mapstruct.MappingTarget;

// @Mapper(componentModel = "spring")
// public interface ProductMapper {
//     @Mapping(target = "productId", source = "id") 
//     @Mapping(target = "categoryName", source = "category.name")
//     @Mapping(target = "sellerId", source = "seller.id")
//     @Mapping(target = "shopName", source = "seller.shopName")
//     ProductResponse toProductResponse(Product product);

//     Product toProduct(ProductRequest request);

//     void updateProduct(@MappingTarget Product product, ProductRequest productRequest);
// }
