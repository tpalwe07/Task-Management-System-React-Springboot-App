package com.parkconnect.auth_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private Integer userId;

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$",
            message = "Password must contain uppercase, number and special character"
    )
    private String password;

    private Instant createdDate;
    private Instant updatedDate;

    public RegisterRequestDto(String username , String password){
        this.username = username;
        this.password = password;
    }
}
