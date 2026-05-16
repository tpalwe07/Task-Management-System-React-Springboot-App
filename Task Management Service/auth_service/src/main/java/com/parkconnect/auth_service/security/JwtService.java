package com.parkconnect.auth_service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@Slf4j
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET;

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    @Value("${jwt.access-token.expiry-ms}")
    private long accessTokenExpiryMs;

    @Value("${jwt.refresh-token.expiry-ms}")
    private long refreshTokenExpiryMs;

    public String generateAccessToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiryMs))
                .signWith(getSignKey())
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiryMs))
                .signWith(getSignKey())
                .compact();
    }

    public boolean isTokenValid(String token, String email) {
        String extractedEmail = extractEmail(token);
        boolean emailMatch = extractedEmail.equals(email);
        boolean notExpired = !isTokenExpired(token);

        log.info("Extracted email: {}", extractedEmail);
        log.info("Expected email: {}", email);
        log.info("Email match: {}", emailMatch);
        log.info("Not expired: {}", notExpired);

        return emailMatch && notExpired;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    private Date extractExpiration(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }
}