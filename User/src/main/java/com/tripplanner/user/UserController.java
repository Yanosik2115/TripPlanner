package com.tripplanner.user;

import com.tripplanner.user.response.ValidationResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.GET;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

		private final UserService userService;

		@GetMapping("/user-exist-by-email")
		public ResponseEntity<ValidationResponse> userExistByEmail(@RequestParam("email") String email) {
				return userService.existsUserByEmail(email);
		}

		@GetMapping("/user-exist-by-username")
		public ResponseEntity<ValidationResponse> userExistByUsername(@RequestParam("username") String username) {
				return userService.existsUserByUsername(username);
		}
}
