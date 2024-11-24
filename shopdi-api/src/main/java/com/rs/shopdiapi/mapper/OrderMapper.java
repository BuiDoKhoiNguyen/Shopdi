package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "date", source = "deliveryDate")
    @Mapping(target = "orderId", source = "id")
    @Mapping(target = "productCount", expression = "java(order.getOrderItems() != null ? order.getOrderItems().size() : 0)")
    @Mapping(target = "status", source = "orderStatus")
    @Mapping(target = "total", source = "totalPrice")
    @Mapping(target = "shippingAddress", source = "shippingAddress")
    OrderResponse toOrderResponse(Order order);

    Order toOrder(CreateOrderRequest request);

}
