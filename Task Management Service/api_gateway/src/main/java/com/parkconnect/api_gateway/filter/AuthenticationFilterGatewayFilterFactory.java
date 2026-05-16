package com.parkconnect.api_gateway.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilterGatewayFilterFactory
        extends AbstractGatewayFilterFactory<AuthenticationFilterGatewayFilterFactory.Config> {

    @Autowired
    private AuthenticationFilter authenticationFilter;

    public AuthenticationFilterGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return authenticationFilter;
    }

    public static class Config { }
}
