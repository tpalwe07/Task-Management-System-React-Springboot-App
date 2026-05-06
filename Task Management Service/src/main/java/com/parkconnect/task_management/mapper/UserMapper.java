package com.parkconnect.task_management.mapper;

import com.parkconnect.task_management.dto.RegisterRequestDto;
import com.parkconnect.task_management.entity.UserEntity;

import java.time.Instant;

public class UserMapper {

    /**
     * Maps UserDto to an existing UserEntity.
     * Useful for updates where you only want to change provided fields.
     */
    public static UserEntity toEntity(RegisterRequestDto registerRequestDto, String encodedPassword) {
        UserEntity entity = new UserEntity();
        entity.setUserId(registerRequestDto.getUserId());
        entity.setUsername(registerRequestDto.getUsername());
        entity.setEmail(registerRequestDto.getEmail());
        entity.setPassword(encodedPassword);

        // Dates are typically handled by the system, but included here if passed from DTO
        entity.setCreatedDate(Instant.now());
        entity.setUpdatedDate(Instant.now());

        return entity;
    }

    /**
     * Maps UserEntity to a new UserDto.
     */
    public static RegisterRequestDto toDto(UserEntity userEntity) {
        return new RegisterRequestDto(
                userEntity.getUserId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getPassword(),
                userEntity.getCreatedDate(),
                userEntity.getUpdatedDate()
        );
    }
}
