package com.tripplanner.user;

import com.tripplanner.user.registration.token.ConfirmationToken;
import com.tripplanner.user.registration.token.ConfirmationTokenService;
import com.tripplanner.user.response.ErrorType;
import com.tripplanner.user.response.ValidationResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

		private final static String USER_NOT_FOUND_MSG =
				"user with email %s not found";

		private final UserRepository userRepository;
		private final BCryptPasswordEncoder bCryptPasswordEncoder;
		private final ConfirmationTokenService confirmationTokenService;


		@Override
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
				return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
		}

		public String signUpUser(User user) {
				boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
				if (userExists) {
						throw new IllegalStateException("email already taken");
				}
				String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
				user.setPassword(encodedPassword);
				userRepository.save(user);

				String token = UUID.randomUUID().toString();

				ConfirmationToken confirmationToken = new ConfirmationToken(
						token,
						LocalDateTime.now(),
						LocalDateTime.now().plusMinutes(15),
						user
				);

				confirmationTokenService.saveConfirmationToken(
						confirmationToken);

				return token;
		}

		public int enableUser(String email) {
				return userRepository.enableUser(email);
		}

		public Optional<User> findByEmail(String email) {
				return userRepository.findByEmail(email);
		}

		public Optional<User> findByUsername(String username) {
				return userRepository.findByUsername(username);
		}

		public ResponseEntity<ValidationResponse> existsUserByEmail(String email) {
				if(userRepository.existsUserByEmail(email)){
						return ResponseEntity.ok(new ValidationResponse(false, "User with that email already exists", ErrorType.EMAIL_ALREADY_EXISTS));
				}
				return ResponseEntity.ok(new ValidationResponse(true, "User with that email does not exist", null));
		}

		public ResponseEntity<ValidationResponse> existsUserByUsername(String username) {
				if(userRepository.existsUserByUsername(username)){
						return ResponseEntity.ok(new ValidationResponse(false, "User with that username already exists", ErrorType.USERNAME_ALREADY_EXISTS));
				}
				return ResponseEntity.ok(new ValidationResponse(true, "User with that username does not exist", null));
		}

}
