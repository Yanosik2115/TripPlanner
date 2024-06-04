package com.tripplanner.user.login;

import com.tripplanner.user.User;
import com.tripplanner.user.UserService;
import com.tripplanner.user.response.LoginResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/login")
@AllArgsConstructor
public class LoginController {
		private final LoginService loginService;

		@PostMapping("/login") //todo find more suitable path
		public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
				return loginService.login(loginRequest);
		}
}
