package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.CreateCategoryRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.Category;
import com.rs.shopdiapi.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/categories")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    public ApiResponse<?> getAllCategories() {
        return ApiResponse.builder()
                .result(categoryService.getAllCategories())
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ApiResponse<?> createCategory(@Valid @RequestBody CreateCategoryRequest category) {
        return ApiResponse.builder()
                .result(categoryService.createCategory(category))
                .build();
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<?> getCategory(@PathVariable Long categoryId) {
        return ApiResponse.builder()
                .result(categoryService.getCategoryById(categoryId))
                .build();
    }

    @PutMapping("/update/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<?> updateCategory(@PathVariable Long categoryId, @RequestBody Category category) {
        return ApiResponse.builder()
                .result(categoryService.updateCategory(category, categoryId))
                .build();
    }
    @GetMapping("/child/{categoryName}")
    public ApiResponse<?> getChildCategories(@PathVariable String categoryName) {
        return ApiResponse.builder()
                .result(categoryService.getCategoriesByParent(categoryName))
                .build();
    }
    @DeleteMapping("/delete/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<?> deleteCategory(@PathVariable Long categoryId) {
        return ApiResponse.builder()
                .result(categoryService.deleteCategory(categoryId))
                .build();
    }

    @GetMapping("/name/{categoryName}")
    public ApiResponse<?> getCategoryByName(@PathVariable String categoryName) {
        return ApiResponse.builder()
                .result(categoryService.getCategoryByName(categoryName))
                .build();
    }
}
