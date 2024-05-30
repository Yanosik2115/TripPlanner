package com.trippplanner.client;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;


@Data
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "users")
public class Client {

		@Id
		private String id;
		private String email;
		private String username;
		private String image;
		private String password;
		private Boolean isVerified;

}
