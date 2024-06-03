package com.tripplanner.authorization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.tripplanner.authorization", "com.tripplanner"})
public class SpringSecurityApplication {

		public static void main(String[] args) {
				SpringApplication.run(SpringSecurityApplication.class, args);
		}

}
