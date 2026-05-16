package com.parkconnect.auth_service.repository;

import com.parkconnect.auth_service.entity.RefreshTokenEntity;
import com.parkconnect.auth_service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {

    Optional<RefreshTokenEntity> findByToken(String token);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE RefreshTokenEntity r SET r.revoked = true WHERE r.user = :user")
    void revokeAllByUser(UserEntity user);
}
