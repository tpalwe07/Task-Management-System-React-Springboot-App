package com.parkconnect.task_management.service;

import com.parkconnect.task_management.dto.AuthResponseDto;
import com.parkconnect.task_management.dto.LoginRequestDto;
import com.parkconnect.task_management.dto.RefreshTokenRequestDto;
import com.parkconnect.task_management.dto.RegisterRequestDto;

public interface UserService {
    RegisterRequestDto registerUser(RegisterRequestDto registerRequestDto);

    AuthResponseDto loginUser(LoginRequestDto userDto);

    AuthResponseDto refreshToken(RefreshTokenRequestDto request);
}
