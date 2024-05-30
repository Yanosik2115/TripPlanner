package com.trippplanner.client;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000") // Allow requests from your frontend application
						.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"); // Allow these HTTP methods
		}
}