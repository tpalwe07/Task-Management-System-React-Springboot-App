package com.parkconnect.task_management.service;

import com.parkconnect.task_management.entity.RefreshTokenEntity;
import com.parkconnect.task_management.entity.UserEntity;
import com.parkconnect.task_management.repository.RefreshTokenRepository;

public interface RefreshTokenService {

    RefreshTokenEntity createRefreshToken(UserEntity user, String token);

    RefreshTokenEntity verifyRefreshToken(String token);

    void revokeAllUserTokens(UserEntity user);

    String refreshAccessToken(String refreshToken);
}
