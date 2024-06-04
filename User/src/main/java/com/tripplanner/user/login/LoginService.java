package com.tripplanner.user.login;


import com.tripplanner.user.User;
import com.tripplanner.user.UserService;
import com.tripplanner.user.response.ErrorType;
import com.tripplanner.user.response.LoginResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.json.Json;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class LoginService {

		private static final String USER_NOT_FOUND_MSG = "User with this email not found";
		private static final String INVALID_PASSWORD_MSG = "Invalid password";
		private static final String USER_NOT_ENABLED_MSG = "User is not enabled";
		private static final String LOGIN_SUCCESSFUL_MSG = "Login successful";

		private final UserService userService;
		private final BCryptPasswordEncoder bCryptPasswordEncoder;

		public ResponseEntity<LoginResponse> login(LoginRequest request) {
				Optional<User> optionalUser = userService.findByEmail(request.getEmail());

				return optionalUser.map(user -> {
						String password = user.getPassword();
						String requestPassword = request.getPassword();

						if (bCryptPasswordEncoder.matches(requestPassword, password) && user.getEnabled() != null && user.getEnabled()) {
								return ResponseEntity.ok(new LoginResponse(true, LOGIN_SUCCESSFUL_MSG, user, null));
						} else if (Boolean.FALSE.equals(user.getEnabled())) {
								return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(false, USER_NOT_ENABLED_MSG, null, ErrorType.USER_NOT_ENABLED));
						} else {
								return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(false, INVALID_PASSWORD_MSG, null, ErrorType.INVALID_PASSWORD));
						}

				}).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(false, USER_NOT_FOUND_MSG, null, ErrorType.USER_NOT_FOUND))
				);

		}
}
