package com.tripplanner.authorization.auth;


import com.tripplanner.authorization.config.JwtService;
import com.tripplanner.authorization.user.Role;
import com.tripplanner.authorization.user.User;
import com.tripplanner.authorization.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

		private final UserRepository userRepository;
		private final PasswordEncoder passwordEncoder;
		private final JwtService jwtService;
		private final AuthenticationManager authenticationManager;

		public AuthenticationResponse register(RegisterRequest request) {
				User user = User.builder()
						.username(request.getUsername())
						.email(request.getEmail())
						.password(passwordEncoder.encode(request.getPassword()))
						.role(Role.USER)
						.build();
				userRepository.save(user);

				var jwtToken = jwtService.generateToken(user);
				return AuthenticationResponse.builder().token(jwtToken).build();
		}

		public AuthenticationResponse authenticate(AuthenticationRequest request) {
				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(
								request.getEmail(),
								request.getPassword()));

				User user = userRepository.findByEmail(request.getEmail()).orElseThrow(); //todo handle exception

				var jwtToken = jwtService.generateToken(user);
				return AuthenticationResponse.builder().token(jwtToken).build();
		}
}
