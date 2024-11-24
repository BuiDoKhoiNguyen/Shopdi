package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Category;
import com.rs.shopdiapi.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parentCategory.id = :categoryId")    
    Page<Product> findAllByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.parentCategory.id = :categoryId")
    Page<Product> findAllByParentCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @Query("SELECT p From Product p where LOWER(p.productName) Like %:query% OR LOWER(p.description) Like %:query% OR LOWER(p.brand) LIKE %:query% OR LOWER(p.category.name) LIKE %:query%")
    List<Product> searchProduct(@Param("query") String query);

    Page<Product> findAllBySellerId(Long sellerId, Pageable pageable);
}
