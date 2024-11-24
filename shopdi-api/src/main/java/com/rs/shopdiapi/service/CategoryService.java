package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CreateCategoryRequest;
import com.rs.shopdiapi.domain.dto.response.CategoryResponse;
import com.rs.shopdiapi.domain.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    List<CategoryResponse> getCategoriesByParent(String parent);
    Category getCategoryById(Long categoryId);

    Category getCategoryByName(String categoryName);

    CategoryResponse createCategory(CreateCategoryRequest category);

    Category updateCategory(Category category, Long categoryId);

    String deleteCategory(Long categoryId);

    boolean isChildCategory(Category parent, Category category);

    void addChildCategory(Category parent, Category child);

    void removeChildCategory(Category parent, Category child);
}
