package com.rs.shopdiapi.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rs.shopdiapi.domain.enums.OrderItemStatusEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class OrderItem extends BaseEntity<Long> {
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    Seller seller;

    @Enumerated(EnumType.STRING)
    OrderItemStatusEnum orderItemStatus = OrderItemStatusEnum.PENDING;

    String variant;
    Integer quantity;
    BigDecimal price;
    LocalDateTime deliveryDate;
}
