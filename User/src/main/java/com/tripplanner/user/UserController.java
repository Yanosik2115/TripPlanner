package com.tripplanner.user;

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
		public String userExistByEmail(@RequestParam("email") String email) {
				if(userService.findByEmail(email).isPresent()){
						return "User with that email already exists";
				}
				return "";
		}

		@GetMapping("/user-exist-by-username")
		public String userExistByUsername(@RequestParam("username") String username) {
				if(userService.findByUsername(username).isPresent()){
						return "User with that username already exists";
				}
				return "";
		}
}
