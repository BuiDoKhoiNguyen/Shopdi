package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long>, JpaSpecificationExecutor<Seller> {
    boolean existsByUser(User user);
}