package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    Long productId;
    String productName;
    String description;
    BigDecimal price;
    String brand;
    ProductStatusEnum status;
    List<String> imageUrls;
    String categoryName;
    Set<String> tagNames;
    Long sellerId;
    String shopName;
    List<VariantResponse> variants;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VariantResponse {
        String variantDetail;
        Integer quantity;
    }
}