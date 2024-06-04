package com.tripplanner.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
		public static void main(String[] args) {
				SpringApplication.run(EurekaServerApplication.class, args);
		}

		@Bean
		public FilterRegistrationBean<CorsFilter> corsFilter() {
				FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
				registrationBean.setFilter(new CorsFilter());
				registrationBean.addUrlPatterns("/*");
				return registrationBean;
		}
}
