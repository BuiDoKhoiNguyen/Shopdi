package com.rs.shopdiapi.domain.entity;

import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class Order extends BaseEntity<Long> {
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "shipping_address_id", nullable = false)
    private Address shippingAddress;
//    @Embedded
//    PaymentDetails paymentDetails = new PaymentDetails();
    BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    OrderStatusEnum orderStatus = OrderStatusEnum.PENDING;

    String orderNotes;

    LocalDateTime deliveryDate;
    public List<OrderItem> getOrderItems() {
        if(orderItems == null) {            
            orderItems = new ArrayList<>();
        }
        return orderItems;
    }
}
