package com.tripplanner.eurekaserver;

import jakarta.validation.groups.ConvertGroup;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000") // Allow your development origin
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("*");
		}
}
