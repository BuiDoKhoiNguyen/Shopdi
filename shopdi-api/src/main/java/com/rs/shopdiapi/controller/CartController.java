package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.CartItemRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.service.CartItemService;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CartController {
    CartService cartService;
    CartItemService cartItemService;
    UserService userService;
    CartMapper cartMapper;
    @GetMapping
    public ApiResponse<?> getCart() {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartService.getUserCart(userId))
                .build();
    }

//    @GetMapping("/total-price")
//    public ApiResponse<?> calculateTotalPrice() {
//        User user = userService.getCurrentUser();
//        BigDecimal totalPrice = cartService.calculateTotalPrice(user.getCart().getId());
//        return ApiResponse.builder()
//                .result(totalPrice)
//                .build();
//    }


    @PostMapping("/add-item")
    public ApiResponse<?> addItemToCart(@RequestBody CartItemRequest request) {
        Long userId = userService.getCurrentUser().getId();
        // return ApiResponse.builder()
        //         .result(cartItemService.addOrUpdateCartItem(userId, request))
        //         .build();
        CartItemResponse response =cartMapper.toCartItemResponse( cartItemService.addOrUpdateCartItem(userId, request));
        return ApiResponse.builder()
                .result(response)
                .build();
    }

    @PutMapping("/items/{cartItemId}")
    public ApiResponse<?> updateCartItemQuantity(@PathVariable Long cartItemId, @RequestParam Integer quantity) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.updateCartItemQuantity(userId, cartItemId, quantity))
                .build();
    }

    @DeleteMapping("/items/{cartItemId}")
    public ApiResponse<?> deleteCartItem(@PathVariable Long cartItemId) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.deleteCartItem(userId, cartItemId))
                .build();
    }

    @DeleteMapping("/clear")
    public ApiResponse<?> clearCart() {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.clearCart(userId))
                .build();
    }
}
