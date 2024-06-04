package com.tripplanner.user;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
		Optional<User> findByEmail(String email);

		@Transactional
		@Modifying
		@Query("UPDATE User a " +
				"SET a.enabled = TRUE WHERE a.email = ?1")
		int enableUser(String email);
}
