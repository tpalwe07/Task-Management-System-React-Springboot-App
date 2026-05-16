package com.parkconnect.auth_service.repository;

import com.parkconnect.auth_service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    boolean existsByEmail(String email);

    Optional<UserEntity>  findByEmail(String email);

    boolean existsByUsernameAndUserIdNot(String username, Integer userId);
}
