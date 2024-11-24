package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.CreateCategoryRequest;
import com.rs.shopdiapi.domain.dto.response.CategoryResponse;
import com.rs.shopdiapi.domain.dto.response.ChildCategoryResponse;
import com.rs.shopdiapi.domain.entity.Category;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.CategoryMapper;
import com.rs.shopdiapi.repository.CategoryRepository;
import com.rs.shopdiapi.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Transactional
    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAllByParentCategoryIsNull();

        return categories.stream()
                .map(category -> CategoryResponse.builder()
                        .categoryId(category.getId())
                        .name(category.getName())
                        .parentId(Optional.ofNullable(category.getParentCategory()).map(Category::getId).orElse(null))
                        .parentName(Optional.ofNullable(category.getParentCategory()).map(Category::getName).orElse(null))
                        .childCategories(category.getChildCategories().stream()
                                .map(childCategory -> ChildCategoryResponse.builder()
                                        .id(childCategory.getId())
                                        .name(childCategory.getName())
                                        .build())
                                .toList())
                        .build())
                .toList();
    }

    @Transactional
    @Override
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
    }

    @Override
    public Category getCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
    }

    @Transactional
    @Override
    public CategoryResponse createCategory(CreateCategoryRequest categoryRequest) {
        if (categoryRepository.existsByName(categoryRequest.getName())) {
            throw new AppException(ErrorCode.CATEGORY_ALREADY_EXISTS);
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .build();

        if (categoryRequest.getParentName() != null) {
            Category parentCategory = categoryRepository.findByName(categoryRequest.getParentName())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            category.setParentCategory(parentCategory);
        }

        Category savedCategory = categoryRepository.save(category);

        List<ChildCategoryResponse> childCategories = savedCategory.getChildCategories() != null
                ? savedCategory.getChildCategories().stream()
                .map(child -> ChildCategoryResponse.builder()
                        .id(child.getId())
                        .name(child.getName())
                        .build())
                .toList()
                : List.of();

        return CategoryResponse.builder()
                .categoryId(savedCategory.getId())
                .name(savedCategory.getName())
                .parentId(Optional.ofNullable(savedCategory.getParentCategory()).map(Category::getId).orElse(null))
                .parentName(Optional.ofNullable(savedCategory.getParentCategory()).map(Category::getName).orElse(null))
                .childCategories(childCategories)
                .build();
    }


    @Transactional
    @Override
    public Category updateCategory(Category category, Long categoryId) {
        var categoryToUpdate = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        categoryToUpdate.setName(category.getName());
        categoryToUpdate.setParentCategory(category.getParentCategory());


        return categoryRepository.save(category);
    }

    @Transactional
    @Override
    public String deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Category deleted successfully";
    }


    @Transactional
    @Override
    public boolean isChildCategory(Category parent, Category category) {
        return category.getParentCategory().equals(parent);
    }

    @Transactional
    @Override
    public void addChildCategory(Category parent, Category child) {
        child.setParentCategory(parent);
        categoryRepository.save(child);
    }

    @Transactional
    @Override
    public void removeChildCategory(Category parent, Category child) {
        child.setParentCategory(null);
        categoryRepository.save(child);
    }
    @Override
    public List<CategoryResponse> getCategoriesByParent(String parent) {
        var parentCategory = categoryRepository.findByName(parent).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        if(parentCategory.getChildCategories().size() == 0) {
            parentCategory = parentCategory.getParentCategory();
        }
        List<Category> categories = categoryRepository.findAllByParentCategory(parentCategory);
        return categories.stream()
                .map(category -> CategoryResponse.builder()
                        .categoryId(category.getId())
                        .name(category.getName())
                        .build())
                .toList();
    }
}
