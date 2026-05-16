package com.parkconnect.auth_service.service;

import com.parkconnect.auth_service.entity.RefreshTokenEntity;
import com.parkconnect.auth_service.entity.UserEntity;

public interface RefreshTokenService {

    RefreshTokenEntity createRefreshToken(UserEntity user, String token);

    RefreshTokenEntity verifyRefreshToken(String token);

    void revokeAllUserTokens(UserEntity user);

    String refreshAccessToken(String refreshToken);
}
