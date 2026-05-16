package com.parkconnect.auth_service.service;

import com.parkconnect.auth_service.dto.AuthResponseDto;
import com.parkconnect.auth_service.dto.LoginRequestDto;
import com.parkconnect.auth_service.dto.RefreshTokenRequestDto;
import com.parkconnect.auth_service.dto.RegisterRequestDto;
import com.parkconnect.auth_service.entity.UserEntity;
import com.parkconnect.auth_service.exception.AuthException;
import com.parkconnect.auth_service.exception.DatabaseException;
import com.parkconnect.auth_service.exception.DuplicateResourceException;
import com.parkconnect.auth_service.exception.ResourceNotFoundException;
import com.parkconnect.auth_service.mapper.UserMapper;
import com.parkconnect.auth_service.repository.UserRepository;
import com.parkconnect.auth_service.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public RegisterRequestDto registerUser(RegisterRequestDto request){

        log.info("Register user request received for email={}", request.getEmail());

        validateUser(request);

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity newUserEntity = UserMapper.toEntity(request, encodedPassword);

        try{
            UserEntity savedUser = userRepository.save(newUserEntity);
            log.info("User registered successfully for email={}", request.getEmail());
            return UserMapper.toDto(savedUser);
        } catch (DataAccessException ex) {
            log.error("Database error while registering user: {}", ex.getMessage(), ex);
            throw new DatabaseException("Failed to register user");
        } catch (Exception ex) {
            log.error("Unexpected error while registering user: {}", ex.getMessage(), ex);
            throw new RuntimeException("Something went wrong");
        }
    }

    public AuthResponseDto loginUser(LoginRequestDto request) {

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        log.warn("user password: {}", user.getPassword());
        log.warn("request password: {}", request.getPassword());
        // 🔑 Password check
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Failed login attempt for email: {}", request.getEmail());
            throw new AuthException("Invalid credentials");
        }

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        refreshTokenService.revokeAllUserTokens(user);
        refreshTokenService.createRefreshToken(user, refreshToken);

        log.info("User logged in successfully: {}", user.getEmail());

        return new AuthResponseDto(accessToken, refreshToken);
    }

    public AuthResponseDto refreshToken(RefreshTokenRequestDto request) {
        String newAccessToken = refreshTokenService.refreshAccessToken(request.getRefreshToken());
        return new AuthResponseDto(newAccessToken, request.getRefreshToken());
    }

    private void validateUser(RegisterRequestDto registerRequestDto) {
        if (registerRequestDto == null) {
            throw new IllegalArgumentException("User data cannot be null");
        }
        if (registerRequestDto.getEmail() == null || registerRequestDto.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (registerRequestDto.getPassword() == null || registerRequestDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
    }

    public RegisterRequestDto updateUserDetails(Integer userId, RegisterRequestDto request){

        UserEntity existingUser = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found")
        );

        if(request.getUsername() != null &&
                userRepository.existsByUsernameAndUserIdNot(request.getUsername(), userId)){
            throw new DuplicateResourceException("Username already taken");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity updatedUser = UserMapper.updateEntityFromDTO(existingUser, request, encodedPassword );

        // 4. Save
        try {
            UserEntity savedUser = userRepository.save(updatedUser);
            log.info("User updated successfully for userId={}", userId);
            return UserMapper.toDto(savedUser);

        } catch (DataAccessException ex) {
            log.error("Database error while updating user userId={}: {}", userId, ex.getMessage());
            throw new DatabaseException("Failed to update user");
        }
    }

    public Integer getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"))
                .getUserId();
    }

    @Transactional
    public void logoutUser(Authentication authentication) {

        String email = authentication.getName();
        log.info("Logout request received for email={}", email);

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        refreshTokenService.revokeAllUserTokens(user);
        SecurityContextHolder.clearContext();

        log.info("User logged out successfully: {}", email);
    }

}
