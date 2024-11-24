package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Variant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VariantRepository extends JpaRepository<Variant, Long>, JpaSpecificationExecutor<Variant> {
    // @Query("SELECT v FROM Variant v WHERE v.name = :name AND v.product = :product")
    // Variant findByNameAndProduct(@Param("name") String name, @Param("product") Product product);
    @Modifying
    @Query("DELETE FROM Variant v WHERE v.product = :product")
    void deleteByProduct(@Param("product") Product product);
}
