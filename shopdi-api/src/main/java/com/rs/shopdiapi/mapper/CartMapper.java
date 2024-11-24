package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.response.CartItemResponse;
import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(target = "cartItems", source = "cartItems", qualifiedByName = "toCartItemsResponse")
    CartResponse toCartResponse(Cart cart);

    @Named("toCartItemsResponse")
    default List<CartItemResponse> toCartItemsResponse(Set<CartItem> cartItems) {
        if (cartItems == null) {
            return null;
        }
        List<CartItemResponse> cartItemResponses = cartItems.stream().map(this::toCartItemResponse).toList();
        if (!cartItemResponses.isEmpty()) {
            return cartItemResponses;
        }
        return null;
    }
    @Mapping(target = "cartItemId", source = "id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.productName")
    @Mapping(target = "sellerId", source = "product.seller.id")
    @Mapping(target = "sellerName", source = "product.seller.shopName")
    CartItemResponse toCartItemResponse(CartItem cartItem);
}
