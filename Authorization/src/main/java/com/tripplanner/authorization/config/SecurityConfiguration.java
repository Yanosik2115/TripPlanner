package com.tripplanner.authorization.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

		private final JwtAuthenticationFilter jwtAuthenticationFilter;
		private final AuthenticationProvider authenticationProvider;

		@Bean
		public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

				http
						.cors()
						.and()
						.csrf()
						.disable()
						.authorizeHttpRequests()
						.requestMatchers("/api/v1/auth/**", "/api/v1/registration/**","/api/v1/login/**","/api/v1/user/**")
						.permitAll()
						.requestMatchers("http://localhost:3000/profile").authenticated().anyRequest().denyAll()
						.and()
						.sessionManagement()
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
						.and()
						.formLogin()
						.loginPage("http://localhost:3000/login") //TODO eureka frontend service retrieve address
						.and()
						.authenticationProvider(authenticationProvider)
						.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


				return http.build();
		}

		@Bean
		public CorsConfigurationSource corsConfigurationSource(){
				CorsConfiguration configuration = new CorsConfiguration();
				configuration.setAllowedOrigins(List.of("http://localhost:3000"));
				configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
				configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "x-auth-token"));
				configuration.setExposedHeaders(List.of("x-auth-token"));
				UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
				source.registerCorsConfiguration("/**", configuration);
				return source;
		}
}
