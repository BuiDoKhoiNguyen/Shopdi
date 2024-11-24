package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    boolean existsByName(String name);

    @Query("SELECT c FROM Category c WHERE c.name = :name")
    Optional<Category> findByName(String name);

    List<Category> findAllByParentCategoryIsNull();
    @Query("SELECT c FROM Category c WHERE c.parentCategory = :parentCategory")
    List<Category> findAllByParentCategory(@Param("parentCategory") Category parentCategory);
}
