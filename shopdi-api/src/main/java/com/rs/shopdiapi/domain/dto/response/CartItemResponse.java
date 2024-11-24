package com.rs.shopdiapi.domain.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemResponse {
    Long sellerId;
    String sellerName;
    Long cartItemId;
    Long productId;
    String productName;
    String productImage;
    String variant;
    Integer quantity;
    BigDecimal price;
}
