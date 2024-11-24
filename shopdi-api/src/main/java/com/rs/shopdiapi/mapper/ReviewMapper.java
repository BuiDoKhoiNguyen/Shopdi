package com.rs.shopdiapi.mapper;

// import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.dto.response.ReviewResponse;
import com.rs.shopdiapi.domain.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    // Review toReview(ReviewRequest reviewRequest);
    ReviewResponse toReviewResponse(Review review);
}
