package com.parkconnect.auth_service.service;

import com.parkconnect.auth_service.entity.RefreshTokenEntity;
import com.parkconnect.auth_service.entity.UserEntity;
import com.parkconnect.auth_service.exception.AuthException;
import com.parkconnect.auth_service.repository.RefreshTokenRepository;
import com.parkconnect.auth_service.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Value("${jwt.refresh-token.expiry-ms}")
    private long refreshTokenExpiryMs;

    @Transactional
    public RefreshTokenEntity createRefreshToken(UserEntity user, String token) {
        RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity();
        refreshTokenEntity.setUser(user);
        refreshTokenEntity.setToken(token);
        refreshTokenEntity.setExpiryDate(Instant.now().plus(refreshTokenExpiryMs, ChronoUnit.MILLIS));
        refreshTokenEntity.setRevoked(false);

        return refreshTokenRepository.save(refreshTokenEntity);
    }

    @Transactional
    public RefreshTokenEntity verifyRefreshToken(String token) {
        RefreshTokenEntity refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new AuthException("Invalid refresh token"));

        if (refreshToken.isRevoked()) {
            throw new AuthException("Refresh token has been revoked");
        }

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);   // cleans up DB
            throw new AuthException("Refresh token has expired");
        }

        return refreshToken;
    }

    @Transactional
    public void revokeAllUserTokens(UserEntity user) {
        try {
            refreshTokenRepository.revokeAllByUser(user);
            log.info("Revoked all refresh tokens for user: {}", user.getEmail());
        } catch (Exception ex) {
            log.error("Error revoking tokens for user: {}", user.getEmail(), ex);
            // don't rethrow — let createRefreshToken still execute
        }
    }

    @Transactional
    public String refreshAccessToken(String refreshToken){

        RefreshTokenEntity storedToken = refreshTokenRepository.findByToken(refreshToken).orElseThrow(()->
               new AuthException("Invalid Refresh Token"));

        if(storedToken.isRevoked()){
            throw new AuthException("Refresh token has been revoked");
        }

        if(storedToken.getExpiryDate().isBefore(Instant.now())){
            refreshTokenRepository.delete(storedToken);
            throw new AuthException(("Refresh token has expired, please login again"));
        }

        String newAccessToken = jwtService.generateAccessToken(storedToken.getUser().getEmail());

        log.info("New access token generated for user: {}",
                storedToken.getUser().getEmail());

        return newAccessToken;
    }
}
