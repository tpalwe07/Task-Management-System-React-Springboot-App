package com.parkconnect.auth_service.service;

import com.parkconnect.auth_service.dto.AuthResponseDto;
import com.parkconnect.auth_service.dto.LoginRequestDto;
import com.parkconnect.auth_service.dto.RefreshTokenRequestDto;
import com.parkconnect.auth_service.dto.RegisterRequestDto;
import org.springframework.security.core.Authentication;

public interface UserService {
    RegisterRequestDto registerUser(RegisterRequestDto registerRequestDto);

    AuthResponseDto loginUser(LoginRequestDto userDto);

    AuthResponseDto refreshToken(RefreshTokenRequestDto request);

    RegisterRequestDto updateUserDetails(Integer userId, RegisterRequestDto registerRequestDto);

    Integer getUserIdByEmail(String email);

    void logoutUser(Authentication authentication);
}
