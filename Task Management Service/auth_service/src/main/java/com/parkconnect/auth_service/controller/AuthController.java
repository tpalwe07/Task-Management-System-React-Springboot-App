package com.parkconnect.auth_service.controller;

import com.parkconnect.auth_service.dto.*;
import com.parkconnect.auth_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto<RegisterRequestDto>> registerUser(@Valid @RequestBody RegisterRequestDto request){

        RegisterRequestDto result = userService.registerUser(request);
        ApiResponseDto<RegisterRequestDto> response = new ApiResponseDto<RegisterRequestDto>(
                                                                        200,
                                                                        "User registered successfully",
                                                                        result
                                                                    );

        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> login(
            @RequestBody LoginRequestDto request) {

        AuthResponseDto tokens = userService.loginUser(request);

        ApiResponseDto<AuthResponseDto> response = new ApiResponseDto<>(200, "Login Successful", tokens );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> refresh(
            @Valid @RequestBody RefreshTokenRequestDto request) {

        AuthResponseDto tokens = userService.refreshToken(request);

        return ResponseEntity.ok(
                new ApiResponseDto<>(200, "Token refreshed successfully", tokens)
        );
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponseDto<RegisterRequestDto>> updateUser(
            @RequestBody RegisterRequestDto request,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        Integer userId = userService.getUserIdByEmail(userDetails.getUsername());

        RegisterRequestDto updatedUser  = userService.updateUserDetails( userId, request);

        return ResponseEntity.ok(
                new ApiResponseDto<>(200, "User updated successfully", updatedUser)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDto<Void>> logout(Authentication authentication) {

        userService.logoutUser(authentication);

        return ResponseEntity.ok(
                new ApiResponseDto<>(200, "Logged out successfully", null)
        );
    }

}
