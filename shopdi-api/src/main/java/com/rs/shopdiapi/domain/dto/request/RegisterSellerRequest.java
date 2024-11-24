package com.rs.shopdiapi.domain.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterSellerRequest {
    @NotBlank(message = "Shop name is required")
    String shopName;

    @NotBlank(message = "Address is required")
    String address;

    @NotBlank(message = "State/District is required")
    String stateOrDistrict;

    @NotBlank(message = "City/Village/Town is required")
    String cityOrTown;

    @Email(message = "Email is invalid")
    String email;

    @Pattern(regexp = "(^0[3|5|7|8|9][0-9]{8}$)", message = "Enter valid 10 digit mobile number")
    String contactNumber;

    String additionalContactInfo;
}
