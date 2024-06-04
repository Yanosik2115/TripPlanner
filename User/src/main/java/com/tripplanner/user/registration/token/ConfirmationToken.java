package com.tripplanner.user.registration.token;


import com.tripplanner.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ConfirmationToken {

		@SequenceGenerator(name = "confirmation_token_sequence",
				sequenceName = "confirmation_token_sequence",
				allocationSize = 1)
		@Id
		@GeneratedValue(generator = "confirmation_token_sequence", strategy = GenerationType.SEQUENCE)
		private Long id;

		@Column(nullable = false)
		private String token;
		@Column(nullable = false)
		private LocalDateTime createdAt;
		@Column(nullable = false)
		private LocalDateTime expiresAt;

		private LocalDateTime confirmedAt;

		@ManyToOne
		@JoinColumn(nullable = false, name = "app_user_id")
		private User user;

		public ConfirmationToken(String token, LocalDateTime now, LocalDateTime expiresAt, User user) {
				this.token = token;
				this.createdAt = now;
				this.expiresAt = expiresAt;
				this.user = user;

		}
}
