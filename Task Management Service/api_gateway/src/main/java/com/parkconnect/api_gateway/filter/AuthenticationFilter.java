package com.parkconnect.api_gateway.filter;

import com.parkconnect.api_gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Component
public class AuthenticationFilter implements GatewayFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;
    private static final Logger log = LoggerFactory.getLogger(AuthenticationFilter.class);


    // Public endpoints that skip JWT validation
    private static final List<String> OPEN_ENDPOINTS = List.of(
            "/v1/api/auth/login",
            "/v1/api/auth/register"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        log.info("AuthenticationFilter - Path: {}", path);

        // Skip filter for public endpoints
        if (OPEN_ENDPOINTS.stream().anyMatch(path::startsWith)) {
            log.info("Skipping auth for public endpoint: {}", path);
            return chain.filter(exchange);
        }

        // Check for Authorization header
        if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
            log.warn("Missing Authorization header for path: {}", path);
            return onError(exchange, HttpStatus.UNAUTHORIZED, "Missing Authorization header");
        }

        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        log.info("Authorization header present: {}", authHeader != null);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Invalid Authorization header format. Header: {}", authHeader);
            return onError(exchange, HttpStatus.UNAUTHORIZED, "Invalid Authorization header format");
        }

        String token = authHeader.substring(7);
        log.info("Extracted token (first 20 chars): {}...", token.substring(0, Math.min(20, token.length())));

        try {
            if (!jwtUtil.isTokenValid(token)) {
                log.warn("Token validation failed for path: {}", path);
                return onError(exchange, HttpStatus.UNAUTHORIZED, "Invalid or expired token");
            }

            log.info("Token validated successfully for path: {}", path);

            // Optionally pass user info downstream as a header
            Claims claims = jwtUtil.extractAllClaims(token);
            log.info("Token claims - Subject: {}, Email: {}",
                    claims.getSubject(),
                    claims.get("email", String.class));

            ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                    .header("X-User-Id", claims.getSubject())
                    .header("X-User-Role", claims.get("role", String.class))
                    .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        } catch (Exception e) {
            log.error("Exception during token validation: {}", e.getMessage(), e);
            return onError(exchange, HttpStatus.UNAUTHORIZED, "Token validation error: " + e.getMessage());
        }

    }

    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus status, String message) {
        log.error("Authentication failed: {}", message);
        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().add("X-Auth-Error", message);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1; // run before other filters
    }
}
