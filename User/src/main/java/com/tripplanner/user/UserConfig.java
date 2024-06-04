package com.tripplanner.user;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Properties;

@Configuration
public class UserConfig {

		@Bean
		public BCryptPasswordEncoder bCryptPasswordEncoder() {
				return new BCryptPasswordEncoder();
		}

		@Bean
		public JavaMailSender javaMailSender(){
				JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
				mailSender.setHost("app.debugmail.io");
				mailSender.setPort(25);

				mailSender.setUsername("ca95a758-c9e8-481f-be8a-a3159c1e984f");
				mailSender.setPassword("7198dc2a-5a32-49bd-bb28-d94273b99da5");

				Properties props = mailSender.getJavaMailProperties();
				props.put("mail.transport.protocol", "smtp");
				props.put("mail.smtp.auth", "true");
				props.put("mail.smtp.starttls.enable", "true");
				props.put("mail.debug", "true");

				return mailSender;
		}
}
